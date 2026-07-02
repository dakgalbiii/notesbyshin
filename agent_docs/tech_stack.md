# Tech Stack & Implementation Guide

> Read this before writing any component, query, or config code.
> These are the exact patterns used in this project — follow them, don't invent alternatives.

---

## Core Setup

### Framework
- **Next.js 14 App Router** — TypeScript strict mode
- ⚠️ Read `node_modules/next/dist/docs/` before writing Next.js code — breaking changes from training data

```bash
# Current install
npm run dev       # localhost:3000
npm run build     # Must pass before any PR or deploy
```

### TypeScript
- Strict mode is ON — no implicit `any`, all props typed
- Auto-generated types from Sanity schema (see Sanity section below)

---

## Styling

### Design Token System (Source of Truth)

All visual values live in `styles/globals.css`. Nothing hardcodes a hex value.

```css
/* styles/globals.css */
:root {
  /* Surfaces */
  --color-paper:      #F4EFE6;   /* Page background */
  --color-card:       #F9F5EC;   /* Card background */
  --color-ink:        #1A1612;   /* Primary text */
  --color-ink-muted:  rgba(26, 22, 18, 0.5);
  --color-ink-faint:  rgba(26, 22, 18, 0.15);

  /* Typography */
  --font-display: 'HelveticaNeue-CondensedBold', 'Arial Narrow', sans-serif;
  --font-label:   'HelveticaNeue-Condensed', 'Arial Narrow', sans-serif;
  --font-value:   'Courier Prime', 'Courier New', monospace;

  /* Spacing */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  1.5rem;
  --space-lg:  2.5rem;
  --space-xl:  4rem;

  /* Specimen card */
  --specimen-padding:    2.5rem;
  --specimen-field-gap:  0.75rem;
  --specimen-border:     0.5px solid var(--color-ink-faint);
  --specimen-underline:  0.5px solid var(--color-ink);
}
```

### Tailwind Config

Design tokens are exposed to Tailwind as semantic class names:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        paper:       'var(--color-paper)',
        card:        'var(--color-card)',
        ink:         'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-faint': 'var(--color-ink-faint)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        label:   ['var(--font-label)'],
        value:   ['var(--font-value)'],
      },
      maxWidth: {
        content:  '1200px',
        specimen: '560px',
      },
    },
  },
}
export default config
```

---

## Fonts

Load via `next/font` — zero FOUT, automatic preload. Set up in `app/layout.tsx`.

```typescript
// app/layout.tsx
import { Courier_Prime } from 'next/font/google'

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-value',
})

// For licensed fonts (Pitch, GT America Mono) — use next/font/local:
import localFont from 'next/font/local'
const pitch = localFont({
  src: [
    { path: '../public/fonts/Pitch-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Pitch-Bold.woff2',    weight: '700' },
  ],
  variable: '--font-value',
})
```

---

## Sanity CMS

### Client Setup

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### Image Builder

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

// Usage: urlFor(heroImage).width(800).format('webp').quality(85).url()
```

### GROQ Queries

All queries live in `lib/sanity/queries.ts`. Never write GROQ inline in page files.

```typescript
// lib/sanity/queries.ts

export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && defined(publishedAt)] | order(archiveNumber asc) {
    _id, title, slug, category, archiveNumber,
    "heroImageUrl": heroImage.asset->url,
    provenance, period, featured
  }
`

export const FEATURED_PROJECT_QUERY = `
  *[_type == "project" && featured == true][0] {
    title, originally, provenance, period, composition, styleDescription
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    title, category, archiveNumber,
    originally, provenance, period, composition, styleDescription,
    "heroImageUrl": heroImage.asset->url,
    "topNotes": topNotes[].asset->url,
    "heartNotes": heartNotes[].asset->url,
    "baseNotes": baseNotes[].asset->url,
  }
`

export const ALL_PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)].slug.current
`

export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, clientName, projectName, projectType, date
  }
`

export const ARCHIVIST_QUERY = `
  *[_type == "archivist"][0] {
    originally, provenance, practice, currently,
    "photoUrl": photo.asset->url,
    instagramUrl, bodyText
  }
`
```

### Fetching in Pages (ISR)

```typescript
// app/page.tsx (example)
import { client } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'

// Revalidate every 60 seconds — CMS updates go live quickly
export const revalidate = 60

export default async function HomePage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY)
  // ...
}
```

---

## Component Patterns

### SpecimenCard (Core Component)

The atomic unit — used on every page. Field labels are in condensed sans (label font), field values in monospace (value font).

```typescript
// components/specimen/SpecimenCard.tsx
interface SpecimenField {
  label: string   // "Originally:"
  value: string   // "sarah & james, wedding"
}

interface SpecimenCardProps {
  title?: string          // "NOTES" — wordmark on homepage
  subtitle?: string       // Concept statement
  fields: SpecimenField[]
  footer?: string         // "notesbyshin · NEW YORK"
  size?: 'full' | 'mini' // mini = project grid card
}
```

**Key detail:** Each field value sits on a dotted underline (`border-bottom`). On first render, this underline draws in left-to-right using CSS `clip-path` animation — as if being typed. 600ms, ease-out, triggered by IntersectionObserver. This is the Margiela moment — keep it subtle.

### InquireForm — Field Mapping

The contact form is a specimen card. Field labels use the archive vocabulary:

```
"Originally:"          → name (text input)
"Provenance:"          → location (text input)
"Period:"              → eventDate (text input — "october 2025", not a date picker)
"Composition:"         → vision (textarea)
"Style Description:"   → notes (textarea)
```

---

## Animation

Two libraries with strict, separate responsibilities. Do not mix.

| Library | Use for | Never use for |
|---|---|---|
| GSAP + ScrollTrigger | Image reveals, underline draw-in, movement dividers | Page transitions |
| Framer Motion | Page enter/exit crossfades, card hover states | Scroll-based animation |

### GSAP Setup (once, at root)

```typescript
// app/layout.tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Image Reveal Pattern (GSAP)

```typescript
// components/gallery/ImageReveal.tsx
useEffect(() => {
  gsap.fromTo(ref.current,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  )
}, [])
```

### Page Transition Pattern (Framer Motion)

```typescript
// components/layout/PageTransition.tsx
const variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}
// AnimatePresence at root layout with mode="wait"
```

### Three Movements — Pacing Differences

The pacing between movements matters:
- **Top Notes:** Faster reveals, tighter 2–3 col grid — first impression, bold
- **Heart Notes:** Slower reveals, more space between images, some full-bleed — emotional core
- **Base Notes:** Slowest reveals, single column or paired, maximum breathing room — what lingers

---

## API Route — Contact Form

```typescript
// app/api/inquire/route.ts
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, location, eventDate, vision, notes, email } = body

  if (!name || !email || !vision) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'notesbyshin <inquire@notesbyshin.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `new inquiry — ${name}`,
      text: `Originally: ${name}\nProvenance: ${location}\nPeriod: ${eventDate}\nComposition: ${vision}\nStyle Description: ${notes}\nReply to: ${email}`,
    })

    await resend.emails.send({
      from: 'notesbyshin <inquire@notesbyshin.com>',
      to: email,
      subject: 'your inquiry has been filed.',
      // react: InquiryConfirmation({ name }) — add after React Email template is built
      text: `your inquiry has been filed, ${name}.\n\nwe'll be in touch.\n\n— notesbyshin`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

---

## Performance

| Concern | Approach |
|---|---|
| Images | `next/image` — WebP, responsive srcset, blur placeholder |
| Fonts | `next/font` — display swap, preload |
| CMS | ISR with `revalidate = 60` |
| Sanity images | `urlFor(img).width(800).format('webp').quality(85).url()` |
| JS bundle | App Router handles code splitting per route automatically |

---

## Dependencies to Install

```bash
npm install gsap @gsap/react
npm install framer-motion
npm install next-sanity @sanity/client @sanity/image-url
npm install resend @react-email/components react-email
```

---

## Sanity Schema Files

Full schemas are in `sanity/schemaTypes/`. Key schemas:
- `project.ts` — title, slug, category, archiveNumber, heroImage, originally, provenance, period, composition, styleDescription, topNotes[], heartNotes[], baseNotes[], featured, publishedAt
- `testimonial.ts` — quote, clientName, projectName, projectType, date, order
- `archivist.ts` — originally, provenance, practice, currently, photo, instagramUrl, bodyText
- `siteConfig.ts` — featuredProject, tagline, contactEmail

See `agent_docs/product_requirements.md` for full schema field definitions.
