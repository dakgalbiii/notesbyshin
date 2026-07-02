# Technical Design Document: notesbyshin MVP

**System:** notesbyshin  
**Version:** MVP 1.0  
**Architecture Pattern:** Jamstack — Static Generation + Headless CMS + Serverless API  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Sanity CMS + Vercel  
**Last Updated:** May 2026

---

## Architecture Overview

```
Visitor Browser
      │
      ▼
  Vercel CDN  ←── Static pages (ISR, revalidated on CMS publish)
      │
      ▼
Next.js App Router
      │
      ├── /                     → Homepage (master label + project grid)
      ├── /work/[slug]          → Project page (specimen + three movements)
      ├── /sillage              → Testimonials
      ├── /archivist            → About
      └── /inquire              → Contact form
                │
                ├── Sanity CMS  ← Content editor (Alvin updates here)
                └── Resend API  ← Contact form email delivery (serverless route)
```

**Why Jamstack for a portfolio:**
- Near-zero hosting cost on Vercel free tier
- Static pages = instant load, high Lighthouse scores
- ISR means CMS updates go live within seconds without a rebuild
- No backend to maintain or secure beyond a single API route

---

## Tech Stack Decisions

### Frontend

| Concern | Choice | Rationale | Alternative |
|---|---|---|---|
| Framework | Next.js 14 App Router | Familiar, ISR support, Image optimization built-in | Astro (slightly better for pure static, less familiar) |
| Styling | Tailwind CSS + CSS custom properties | Design tokens map cleanly to Tailwind's config; familiar | CSS Modules (more verbose for a design-token-heavy system) |
| Animation | GSAP (scroll-triggers) + Framer Motion (page transitions) | GSAP is the right tool for scroll-based reveals; Framer for route transitions | CSS-only (insufficient for the pacing this concept requires) |
| Fonts | next/font (Google or local) | Zero-FOUT loading, automatic preload | @font-face (manual, more fragile) |
| Images | next/image | WebP conversion, lazy load, blur placeholder, responsive srcset | Cloudinary (overkill for portfolio scale) |
| TypeScript | Strict mode | Sanity schema types can be auto-generated; catches prop errors early | JS (not worth it at this complexity level) |

### CMS

**Choice: Sanity**

| | Sanity | Contentful | Notion API |
|---|---|---|---|
| Free tier | Generous (3 users, 100k API calls/mo) | Very limited | Fragile for production |
| Next.js integration | First-class (next-sanity) | Good | Poor |
| Schema-as-code | Yes (TypeScript schemas) | No (GUI only) | No |
| Image handling | Built-in CDN + hotspot cropping | Good | Poor |
| GROQ queries | Flexible, fast | GraphQL (more verbose) | N/A |
| **Verdict** | **✓ Recommended** | Acceptable fallback | Do not use |

Sanity's image pipeline is especially important here — portfolio images need responsive sizes, format conversion, and ideally art-direction (cropping to focal point). Sanity's `@sanity/image-url` handles all of this.

### Email Delivery

**Choice: Resend**
- Free tier: 3,000 emails/month — more than enough for inquiry volume
- React Email for templates — means the confirmation email can match the specimen-card aesthetic
- Simple REST API, official Next.js integration documented

### Deployment

**Choice: Vercel**
- Zero-config Next.js deployment
- Free tier covers portfolio traffic comfortably
- Preview deployments on every push (useful for design iteration)
- Edge network = fast globally, relevant for NY creative scene on mobile

---

## Project Structure

```
notesbyshin/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, nav, page transitions
│   ├── page.tsx                      # Homepage
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx              # Project page
│   ├── sillage/
│   │   └── page.tsx                  # Testimonials
│   ├── archivist/
│   │   └── page.tsx                  # About
│   ├── inquire/
│   │   └── page.tsx                  # Contact form page
│   └── api/
│       └── inquire/
│           └── route.ts              # Serverless route → Resend
│
├── components/
│   ├── specimen/
│   │   ├── SpecimenCard.tsx           # Reusable label — fieldLabel + fieldValue pairs
│   │   ├── SpecimenField.tsx          # Single field row (label + underlined value)
│   │   └── SpecimenCardMini.tsx       # Project grid card (compact version)
│   ├── gallery/
│   │   ├── ThreeMovements.tsx         # Top / Heart / Base section wrapper
│   │   ├── MovementDivider.tsx        # "top notes ·····" label between sections
│   │   └── ImageReveal.tsx            # GSAP scroll-triggered single image
│   ├── layout/
│   │   ├── Nav.tsx                    # Fixed nav — WORK / SILLAGE / ARCHIVIST / INQUIRE
│   │   ├── PageTransition.tsx         # Framer Motion crossfade wrapper
│   │   └── Footer.tsx                 # Minimal — notesbyshin · New York
│   ├── sillage/
│   │   └── SillageCard.tsx            # Testimonial specimen card
│   └── inquire/
│       └── InquireForm.tsx            # Contact form — specimen card structure
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts                  # Sanity client (createClient)
│   │   ├── queries.ts                 # All GROQ queries
│   │   └── image.ts                   # imageUrlBuilder helper
│   └── email/
│       └── templates/
│           └── InquiryConfirmation.tsx # React Email template
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── project.ts                 # Project schema
│   │   ├── testimonial.ts             # Testimonial schema
│   │   ├── archivist.ts               # About page schema
│   │   └── siteConfig.ts              # Global config (featured project, email)
│   └── sanity.config.ts               # Studio config
│
├── styles/
│   └── globals.css                    # Design tokens, base resets, type scale
│
├── public/
│   └── fonts/                         # Self-hosted font files (if licensed)
│
├── tailwind.config.ts                 # Extends default with design tokens
├── next.config.ts                     # Image domains, redirects
└── .env.local                         # Secrets (never committed)
```

---

## Design Token System

The entire visual language lives in CSS custom properties, extended into Tailwind's config. This is the source of truth — nothing hardcodes a hex value.

### globals.css

```css
:root {
  /* Surface */
  --color-paper:        #F4EFE6;
  --color-card:         #F9F5EC;
  --color-ink:          #1A1612;
  --color-ink-muted:    rgba(26, 22, 18, 0.5);
  --color-ink-faint:    rgba(26, 22, 18, 0.15);

  /* Typography */
  --font-display:       'HelveticaNeue-CondensedBold', 'Arial Narrow', sans-serif;
  --font-label:         'HelveticaNeue-Condensed', 'Arial Narrow', sans-serif;
  --font-value:         'Courier Prime', 'Courier New', monospace;

  /* Spacing scale */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  1.5rem;
  --space-lg:  2.5rem;
  --space-xl:  4rem;

  /* Specimen card */
  --specimen-padding:        2.5rem;
  --specimen-field-gap:      0.75rem;
  --specimen-border:         0.5px solid var(--color-ink-faint);
  --specimen-underline:      0.5px solid var(--color-ink);
}
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        paper:     'var(--color-paper)',
        card:      'var(--color-card)',
        ink:       'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-faint': 'var(--color-ink-faint)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        label:   'var(--font-label)',
        value:   'var(--font-value)',
      },
      maxWidth: {
        content: '1200px',
        specimen: '560px',
      },
    },
  },
}
export default config
```

---

## Sanity Schema

### project.ts

```typescript
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title',         type: 'string',   title: 'Title (e.g. "sarah & james")' }),
    defineField({ name: 'slug',          type: 'slug',     title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'category',      type: 'string',   title: 'Category',
      options: { list: ['Wedding', 'Portrait', 'Event', 'Videography', 'Editorial', 'Community'] } }),
    defineField({ name: 'archiveNumber', type: 'number',   title: 'Archive Number (global)' }),
    defineField({ name: 'heroImage',     type: 'image',    title: 'Hero Image', options: { hotspot: true } }),
    defineField({ name: 'originally',    type: 'string',   title: 'Originally (e.g. "sarah & james, wedding")' }),
    defineField({ name: 'provenance',    type: 'string',   title: 'Provenance (e.g. "hudson valley")' }),
    defineField({ name: 'period',        type: 'string',   title: 'Period (e.g. "october 2024")' }),
    defineField({ name: 'composition',   type: 'string',   title: 'Composition (e.g. "golden hour, vows, family")' }),
    defineField({ name: 'styleDescription', type: 'string', title: 'Style Description' }),
    defineField({ name: 'topNotes',      type: 'array',    title: 'Top Notes (images)',
      of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'heartNotes',    type: 'array',    title: 'Heart Notes (images)',
      of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'baseNotes',     type: 'array',    title: 'Base Notes (images)',
      of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'featured',      type: 'boolean',  title: 'Featured on homepage?' }),
    defineField({ name: 'publishedAt',   type: 'datetime', title: 'Published At' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
})
```

### testimonial.ts

```typescript
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote',       type: 'text',   title: 'Quote' }),
    defineField({ name: 'clientName',  type: 'string', title: 'Client Name' }),
    defineField({ name: 'projectName', type: 'string', title: 'Project (e.g. "sarah & james, wedding")' }),
    defineField({ name: 'projectType', type: 'string', title: 'Project Type' }),
    defineField({ name: 'date',        type: 'string', title: 'Date (e.g. "october 2024")' }),
    defineField({ name: 'order',       type: 'number', title: 'Display Order' }),
  ],
})
```

---

## GROQ Queries

```typescript
// lib/sanity/queries.ts

// Homepage: all published projects, ordered by archive number
export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && defined(publishedAt)] | order(archiveNumber asc) {
    _id, title, slug, category, archiveNumber,
    "heroImageUrl": heroImage.asset->url,
    provenance, period, featured
  }
`

// Homepage: featured project for master label
export const FEATURED_PROJECT_QUERY = `
  *[_type == "project" && featured == true][0] {
    title, originally, provenance, period, composition, styleDescription
  }
`

// Project page
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

// Static paths for project pages
export const ALL_PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)].slug.current
`

// Sillage page
export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, clientName, projectName, projectType, date
  }
`

// Archivist page
export const ARCHIVIST_QUERY = `
  *[_type == "archivist"][0] {
    originally, provenance, practice, currently,
    "photoUrl": photo.asset->url,
    instagramUrl, bodyText
  }
`
```

---

## Component Specifications

### SpecimenCard.tsx

The core reusable component. Used on: homepage (master label), project pages, archivist page.

```typescript
interface SpecimenField {
  label: string   // "Originally:"
  value: string   // "sarah & james, wedding"
}

interface SpecimenCardProps {
  title?: string          // "NOTES" — omit on project pages
  subtitle?: string       // concept statement
  fields: SpecimenField[]
  footer?: string         // "notesbyshin · NEW YORK"
  size?: 'full' | 'mini' // full = homepage/project, mini = grid card
}
```

**Key implementation detail:** Each field value sits on a dotted underline (CSS `border-bottom`). On first render (page load), this underline should draw in left-to-right using a CSS clip-path animation — as if being typed. This is the Margiela moment. Keep it subtle: 600ms, ease-out, triggered by IntersectionObserver.

### ThreeMovements.tsx

```typescript
interface ThreeMovementsProps {
  topNotes:   string[]  // image URLs
  heartNotes: string[]
  baseNotes:  string[]
}
```

Each movement section:
1. `MovementDivider` — "top notes ···············" (CSS dotted rule, label floated left)
2. Masonry-style image grid for that movement's images
3. GSAP ScrollTrigger: images fade up + translate Y slightly as they enter viewport

The pacing difference between movements is important:
- Top Notes: faster reveals, tighter grid, 2–3 columns
- Heart Notes: slower reveals, more space between images, some full-bleed
- Base Notes: slowest reveals, single column or paired, maximum breathing room

### InquireForm.tsx

The form is a specimen card. The field labels are the Margiela vocabulary, but the inputs are functional HTML.

```typescript
// Field mapping
"Originally:"          → name (text input)
"Provenance:"          → location (text input)  
"Period:"              → eventDate (text input — "october 2025", not a date picker)
"Composition:"         → vision (textarea — "what are you envisioning")
"Style Description:"   → notes (textarea — "anything else")
```

On submit → POST to `/api/inquire` → Resend sends two emails:
1. To Alvin: full inquiry details
2. To client: confirmation in specimen-card format ("your inquiry has been filed.")

---

## API Route — /api/inquire/route.ts

```typescript
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { InquiryConfirmation } from '@/lib/email/templates/InquiryConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, location, eventDate, vision, notes, email } = body

  // Basic validation
  if (!name || !email || !vision) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    // Notify Alvin
    await resend.emails.send({
      from: 'notesbyshin <inquire@notesbyshin.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `new inquiry — ${name}`,
      text: `
Originally: ${name}
Provenance: ${location}
Period: ${eventDate}
Composition: ${vision}
Style Description: ${notes}
Reply to: ${email}
      `,
    })

    // Confirm to client
    await resend.emails.send({
      from: 'notesbyshin <inquire@notesbyshin.com>',
      to: email,
      subject: 'your inquiry has been filed.',
      react: InquiryConfirmation({ name }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

---

## Animation System

Two libraries, distinct responsibilities — do not mix their use cases.

| Library | Use for | Do not use for |
|---|---|---|
| GSAP + ScrollTrigger | Image reveals, underline draw-in, movement dividers | Page transitions |
| Framer Motion | Page enter/exit transitions, hover states on cards | Scroll-based animation |

### GSAP Setup (app/layout.tsx)

```typescript
// Register ScrollTrigger once at root
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Image Reveal Pattern

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

// Wrap page content in <motion.div> with these variants
// AnimatePresence at root layout with mode="wait"
```

---

## Performance Strategy

| Concern | Approach | Target |
|---|---|---|
| Image optimization | next/image, WebP, responsive srcset, blur placeholder | LCP < 2.5s |
| Font loading | next/font with display: swap, preload | No FOUT |
| JS bundle | App Router automatic code splitting per route | < 100kb per page |
| CMS images | Sanity CDN with width/quality params | Serve at display size |
| Static pages | ISR with 60s revalidation | Instant load from CDN |

### Sanity Image URL with Width

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components:
// urlFor(heroImage).width(800).format('webp').quality(85).url()
```

---

## Font Decision

Two paths — decide before writing CSS:

| Option | Font | Cost | Quality |
|---|---|---|---|
| Free | Courier Prime (Google Fonts) + local Helvetica Neue Condensed fallback | $0 | Good |
| Licensed | Pitch by Klim Type Foundry | ~$60 one-time desktop + web | Excellent — designed for this exact use case |
| Licensed (alt) | GT America Mono by Grilli Type | ~$80 one-time | Very good |

**Recommendation:** Start with Courier Prime to unblock development. Purchase Pitch before launch if budget allows — it will be immediately noticeable to anyone in the design/type community (which is your creative director audience).

Loading via next/font:

```typescript
// app/layout.tsx
import { Courier_Prime } from 'next/font/google'
const courierPrime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'] })

// For licensed fonts — use next/font/local:
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

## Development Workflow

### Git Strategy

```
main          ← production (Vercel auto-deploys)
  └── dev     ← integration branch
        ├── feature/homepage-specimen-card
        ├── feature/project-page-three-movements
        ├── feature/sillage-section
        └── feature/inquire-form
```

Commit convention: `feat:`, `fix:`, `chore:`, `style:` — keeps git log readable.

### Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxx          # Read token for server-side queries
RESEND_API_KEY=xxxx
CONTACT_EMAIL=alvin@notesbyshin.com

# .env.example (commit this — no values)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

### Build Order (Recommended)

Build in this order — each stage is independently shippable:

1. **Design system** — globals.css tokens, Tailwind config, fonts wired up
2. **SpecimenCard component** — the atomic unit everything else uses
3. **Homepage** — master label + static project grid (mock data first)
4. **Sanity schema** — connect CMS, replace mock data
5. **Project page** — specimen + ThreeMovements gallery
6. **Sillage page** — testimonials, enter real client quotes
7. **Archivist page** — about, enter bio
8. **Inquire form** — form + API route + Resend
9. **Nav + page transitions** — polish layer
10. **Performance pass** — Lighthouse audit, image optimization check
11. **Content population** — real projects, real photos
12. **Launch**

---

## Cost Breakdown

| Service | Tier | Monthly | Notes |
|---|---|---|---|
| Vercel | Hobby (free) | $0 | Sufficient for portfolio traffic |
| Sanity | Free | $0 | 3 users, 100k API req/mo — fine |
| Resend | Free | $0 | 3,000 emails/mo — more than enough |
| Domain (notesbyshin.com) | — | ~$1.50 | ~$18/yr via Namecheap or Cloudflare |
| Pitch font (optional) | One-time | — | ~$60 one-time if purchased |
| **Total ongoing** | | **~$1.50/mo** | |

Upgrade triggers:
- Vercel Pro ($20/mo): needed if you add password-protected client galleries or need more build minutes
- Sanity Growth ($15/mo): needed past 3 editors or if you hit API call limits (unlikely for a solo portfolio)

---

## Security Considerations

This is a portfolio + contact form — low attack surface. Key items:

- **Contact form:** Rate limit `/api/inquire` with `@upstash/ratelimit` (free tier). Prevents spam floods.
- **Environment variables:** Never expose `SANITY_API_TOKEN` to the client. Server-side queries only.
- **CORS:** Next.js API routes are same-origin by default. No changes needed.
- **Spam:** Add honeypot field to inquiry form (hidden input — if filled, reject silently). Consider Cloudflare Turnstile (free, privacy-respecting) if spam becomes an issue post-launch.
- **Content:** Sanity is read-only from the public site. Write access requires authentication through Sanity Studio.

---

## MVP Definition of Technical Done

- [ ] All P0 pages render from real Sanity content (no mock data)
- [ ] `next build` passes with zero TypeScript errors
- [ ] Lighthouse mobile score > 90 across all pages
- [ ] Contact form sends emails to Alvin and confirmation to client
- [ ] Images served as WebP with correct responsive sizes
- [ ] GSAP scroll reveals working on Chrome, Safari, Firefox
- [ ] Page transitions working on route change
- [ ] Tested on iPhone Safari (primary mobile target)
- [ ] All images have meaningful alt text
- [ ] notesbyshin.com → Vercel deployment, SSL active
- [ ] Sanity Studio deployed (sanity.io/manage or custom subdomain)

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Safari GSAP quirks | Medium | Medium | Test on real iPhone early, not just DevTools |
| Courier Prime feels too generic | Low | High | Decide on Pitch before content population |
| Sanity free tier API limits | Low | Low | 100k calls/mo is ~3k page loads/day — fine |
| Image sizes tank Lighthouse | Medium | High | Run audit after first real project is added |
| KCF work tone mismatch | Medium | Medium | Curate carefully; consider K— category as optional/hidden |

---

*TDD Version: 1.0*  
*Status: Ready for Build*  
*Owner: Alvin Shin — notesbyshin*  
*Next: AGENTS.md + tool configuration (Part 4)*
