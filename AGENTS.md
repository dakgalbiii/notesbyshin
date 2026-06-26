# AGENTS.md — notesbyshin Master Plan

> **Read this first. Always.**
> This is the single source of truth for what we're building, where we are, and how to work together.
> For deep implementation detail, see `agent_docs/`.

---

## Project

**notesbyshin** — A photographer/videographer portfolio framed as an archival specimen collection, inspired by Maison Margiela's Replica fragrance line. Each project is a "Replica" — catalogued, labelled, composed like a perfume.

**Tagline:** *reproduction of moments, light, and feeling from specific people and places.*

**Owner:** Alvin Shin — New York
**Site:** notesbyshin.com → Vercel (free tier)
**Cost:** ~$1.50/month ongoing

---

## Stack at a Glance

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 App Router | TypeScript strict mode |
| Styling | Tailwind CSS + CSS custom properties | Tokens in `globals.css` are the source of truth |
| CMS | Sanity | GROQ queries, ISR revalidation, image CDN |
| Animation | GSAP + ScrollTrigger | Scroll-based image reveals only |
| Animation | Framer Motion | Page transitions only — do not use for scroll |
| Email | Resend | Contact form delivery |
| Fonts | Courier Prime (Google) | Upgrade to Pitch by Klim before launch if budget allows |
| Deployment | Vercel | Zero-config, free tier |

> ⚠️ **BREAKING CHANGE ALERT:** This is not the Next.js from your training data.
> Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code.
> Heed deprecation notices. APIs and file conventions may differ.

---

## Project Structure

```
notesbyshin/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, nav, page transitions
│   ├── page.tsx                      # Homepage (master label + project grid)
│   ├── work/[slug]/page.tsx          # Project page (specimen + three movements)
│   ├── sillage/page.tsx              # Testimonials
│   ├── archivist/page.tsx            # About
│   ├── inquire/page.tsx              # Contact form
│   └── api/inquire/route.ts          # Serverless → Resend
├── components/
│   ├── specimen/                     # SpecimenCard, SpecimenField, SpecimenCardMini
│   ├── gallery/                      # ThreeMovements, MovementDivider, ImageReveal
│   ├── layout/                       # Nav, PageTransition, Footer
│   ├── sillage/                      # SillageCard
│   └── inquire/                      # InquireForm
├── lib/
│   ├── sanity/                       # client.ts, queries.ts, image.ts
│   └── email/templates/              # React Email templates
├── sanity/
│   └── schemaTypes/                  # project.ts, testimonial.ts, archivist.ts, siteConfig.ts
├── styles/globals.css                # Design tokens (source of truth — no hardcoded values)
├── tailwind.config.ts
├── agent_docs/                       # Implementation detail — read before coding
└── .env.local                        # Secrets — never commit
```

---

## ✅ Active Phase

### Phase 1 — Design System + SpecimenCard

**Why first:** Everything else — homepage, project pages, testimonials, inquire — is built from the SpecimenCard component. Getting the visual atoms right before building pages saves rewrites.

**Tasks:**
- [ ] `styles/globals.css` — CSS custom properties (colors, fonts, spacing, specimen-specific vars)
- [ ] `tailwind.config.ts` — extend theme with design token references
- [ ] `app/layout.tsx` — load fonts via `next/font` (Courier Prime + condensed sans fallback)
- [ ] `components/specimen/SpecimenField.tsx` — single label + underlined value row
- [ ] `components/specimen/SpecimenCard.tsx` — card wrapper used across all pages
- [ ] `components/specimen/SpecimenCardMini.tsx` — compact version for project grid cards

**Phase 1 done when:** Navigate to `/` and a SpecimenCard renders with correct typography, paper background, ink text, and the underline draw-in animation. No real data needed yet — hardcode one example card.

---

## Build Roadmap

| Phase | Goal | Done When |
|---|---|---|
| **1** ← You are here | Design system + SpecimenCard | SpecimenCard renders correctly in browser |
| 2 | Homepage | Master label + filterable project grid (mock data) |
| 3 | Sanity CMS | Schema live, GROQ queries connected, mock data replaced |
| 4 | Project page | SpecimenCard full + ThreeMovements gallery + GSAP scroll reveals |
| 5 | Sillage + Archivist | Testimonials and about pages rendering from Sanity |
| 6 | Inquire | Contact form sends email to Alvin + confirmation to client |
| 7 | Polish | Nav, Framer Motion transitions, Lighthouse mobile > 90 |
| 8 | Launch | Real content, notesbyshin.com → Vercel, SSL active |

---

## How to Think

1. **Read this file first** — understand the active phase before writing any code
2. **Plan → Approve → Execute** — propose a brief plan, get approval, then implement
3. **One feature at a time** — complete and verify before moving on
4. **Verify in browser** — `npm run dev`, open localhost:3000, check the actual result
5. **Ask one specific question** — if something's unclear, ask precisely rather than assume
6. **Explain trade-offs** — when recommending a pattern, briefly mention the alternative

---

## What NOT To Do

- Do NOT delete files without explicit confirmation
- Do NOT modify Sanity schemas without discussing the content impact first
- Do NOT add features outside the current phase
- Do NOT say "it should work" without opening a browser
- Do NOT bypass TypeScript errors — fix them
- Do NOT use `any` — use `unknown` with type guards, or Zod for external data
- Do NOT hardcode hex values — all colors come from CSS custom properties
- Do NOT mix GSAP and Framer Motion responsibilities
- Do NOT add npm packages without checking if a native API or existing dep handles it
- Do NOT expose `SANITY_API_TOKEN` to client-side code — server-side only

---

## Engineering Constraints

- **TypeScript strict mode** — all props and function return types must be explicit
- **Design tokens** — no hardcoded colors or spacing; `globals.css` vars are the only source
- **Images** — always `next/image`, never raw `<img>`
- **GROQ queries** — live in `lib/sanity/queries.ts`, not scattered in page files
- **Business logic** — not in route handlers; API route at `/api/inquire` handles transport only
- **Commits** — `feat:`, `fix:`, `chore:`, `style:` prefixes; one feature per commit

---

## Key Commands

```bash
npm run dev          # Start dev server → localhost:3000
npm run build        # Production build (must pass before marking done)
npm run lint         # ESLint — fix before committing
npx tsc --noEmit     # TypeScript check — zero errors required
npx sanity dev       # Sanity Studio → localhost:3333 (separate terminal)
```

---

## Environment Variables

```bash
# .env.local (never commit this file)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # Server-side only
RESEND_API_KEY=
CONTACT_EMAIL=alvin@notesbyshin.com
```

---

## Detailed Docs

| File | Read when |
|---|---|
| `agent_docs/tech_stack.md` | Before writing any component, config, or query code |
| `agent_docs/project_brief.md` | For conventions, naming, workflow rules |
| `agent_docs/product_requirements.md` | For feature acceptance criteria and design details |
| `agent_docs/testing.md` | Before verifying or committing any feature |
