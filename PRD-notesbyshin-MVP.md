# Product Requirements Document: notesbyshin MVP

**Product:** notesbyshin  
**Version:** MVP (1.0)  
**Status:** Draft  
**Stack:** Next.js 14 + Tailwind CSS + Headless CMS  
**Last Updated:** May 2026

---

## Product Vision

notesbyshin is a photographer/videographer portfolio site that frames creative work as an archival specimen collection — each project a "Replica" of a specific moment, place, and feeling. Inspired by Maison Margiela's Replica fragrance line, the site treats the portfolio itself as a curated archive, using specimen-card vocabulary, typewriter typography, and the fragrance-notes pyramid to sequence imagery within projects.

The site exists to convert prospective clients into inquiries, while establishing Alvin as a distinctly positioned creative — not a commodity photographer, but a composer of moments.

**Tagline:** reproduction of moments, light, and feeling from specific people and places.

---

## The Problem

Photographer portfolio sites are indistinguishable. Squarespace templates, hero videos, "Home / Work / About / Contact" navigation, white backgrounds. The work has to carry all the weight because the container is invisible.

notesbyshin inverts this: the container is the differentiator. A prospective client who arrives and feels the Margiela reference self-selects — they are already the right client. The concept is the filter.

**Why existing solutions fall short:**
- Generic portfolio platforms (Squarespace, Format, Pixieset) offer no conceptual differentiation
- Most photographer sites compete purely on image quality — a race anyone can enter
- No standard portfolio site architecture treats the body of work as a composed, named, catalogued archive

---

## Target Users

### Primary: Prospective Clients

People actively looking to hire a photographer or videographer in the New York area. They arrive via Instagram, word of mouth, Google, or referral. They are evaluating multiple photographers simultaneously and need to feel something — a reason to choose Alvin over someone equally skilled.

| Segment | What they need from the site |
|---|---|
| Engaged couples | To feel emotionally safe — this person will capture our day with intention |
| Event organizers | Professionalism, range, quick path to inquiry |
| Brands / creative directors | Editorial sensibility, creative point of view, concept literacy |
| Portrait clients | To see warmth and intentionality in how subjects are treated |

### Secondary: Creative Peers + Community

KCF community, NY creative scene, other photographers. They do not hire Alvin directly but they refer, share, and validate. The concept needs to hold up to creative scrutiny.

---

## User Journey

**Discovery → First Impression → Browse → Inquire**

1. Arrives via Instagram, Google, or referral. Lands on homepage.
2. Reads the master label. "reproduction of moments, light, and feeling from specific people and places." Gets it immediately or reads it twice. Both are fine.
3. Browses the project grid. Each project card is a miniature specimen label — numbered, categorized, titled with a place and date.
4. Opens a project. Sees the full specimen card, then photographs unfold in three movements (top / heart / base notes). Feels the pacing.
5. Reads Sillage. Client testimonials as archival field notes. Social proof without feeling transactional.
6. Hits Inquire. The contact form is itself a specimen card — they fill in their own Replica before a single photo is taken.
7. Alvin receives a contextual, already-creative inquiry.

---

## Work Categories (Catalogue)

| Prefix | Category |
|---|---|
| W— | Weddings |
| P— | Portraits |
| E— | Events |
| V— | Videography |
| C— | Editorial / Creative |
| K— | KCF / Community |

Projects are numbered within category (W-001, W-002) and carry a global archive number (N° 001, N° 002) for the full grid view.

---

## MVP Features

### Must Have (P0)

#### 1. Homepage — The Master Label
The site's identity card. Introduces notesbyshin using the Margiela label structure: wordmark, concept subtitle, featured project's specimen fields. Below: full project grid as miniature specimen cards.

**Acceptance criteria:**
- [ ] Master label renders with correct typographic hierarchy (condensed sans wordmark + monospace field values)
- [ ] Featured project fields pull from CMS (pinnable)
- [ ] Project grid shows all published projects, filterable by category
- [ ] Each card shows: category + number, title, location, year, hero image
- [ ] Responsive: 2 col mobile, 3 col tablet, 4 col desktop

#### 2. Project Pages — Specimen + Three Movements
Each project opens with its full specimen card, then photography unfolds in three scroll-triggered sections: Top Notes (immediate, bold frames), Heart Notes (emotional core), Base Notes (detail, craft, what lingers).

**Acceptance criteria:**
- [ ] Specimen card renders all CMS fields: Originally, Provenance and Period, Composition, Style Description
- [ ] Three-movement gallery with labeled section dividers
- [ ] Images lazy-loaded and optimized via Next.js Image
- [ ] Scroll-triggered reveal animations (GSAP or Framer Motion)
- [ ] Mobile: single column, full-bleed images
- [ ] Prev / next project navigation at bottom

#### 3. Sillage — Testimonials
Client testimonials as archival field notes. Each is its own specimen card: quote as body, client name + project as "filed by" attribution.

**Acceptance criteria:**
- [ ] Renders 4–6 testimonials from CMS
- [ ] Each card: quote, client name, project name/type, date
- [ ] Section header: "sillage" with subtitle "the trail left behind"
- [ ] Masonry or staggered grid layout — not a carousel
- [ ] New testimonials addable via CMS without code changes

#### 4. Inquire — A Specimen Card to Fill
Contact form structured as a Replica label. Fields named in vocabulary: "Originally:" (name), "Provenance and Period:" (date + location), "Composition:" (what they envision), "Style Description:" (anything else).

**Acceptance criteria:**
- [ ] Field labels match specimen-card vocabulary
- [ ] Sends email notification to Alvin on submission
- [ ] Confirmation state feels intentional, not generic
- [ ] Graceful validation, no jarring error states
- [ ] Fully keyboard navigable, ARIA labels on all inputs

#### 5. The Archivist — About Page
A specimen card for Alvin. "Originally:", "Provenance and Period:", "Practice:", "Currently:" in the same vocabulary as project cards. Below: a brief human paragraph.

**Acceptance criteria:**
- [ ] Specimen card structure for bio fields
- [ ] Editorial photo of Alvin
- [ ] Links to Instagram and relevant channels
- [ ] Content editable via CMS

#### 6. Navigation
Four items: WORK / SILLAGE / ARCHIVIST / INQUIRE. Lowercase. Minimal. Fixed or sticky header.

**Acceptance criteria:**
- [ ] Active state: subtle underline or dot only
- [ ] Mobile navigation works cleanly
- [ ] "notesbyshin" wordmark links home

---

### Should Have (P1 — post-launch)

- Vimeo embeds within videography project pages (top note before stills)
- Password-protected projects for private client work
- SEO metadata per project (Open Graph images, structured data)
- Light/dark toggle (cream-and-ink inverts beautifully to near-black)

### Won't Have in MVP

- E-commerce / print sales
- Client delivery galleries
- Booking calendar
- Blog
- Multi-language support

---

## Design System

### Typography

| Role | Font | Notes |
|---|---|---|
| Wordmark / headers | Helvetica Neue Condensed or equivalent tight grotesque | "NOTES", category labels, nav |
| Field labels | Same grotesque, tracked out | "Originally:", "Provenance:" |
| Field values | Courier Prime (free) or Pitch (licensed) | The filled-in content |
| Body prose | Humanist sans or same monospace | Archivist page |

### Color Tokens

```css
--color-paper:      #F4EFE6;
--color-card:       #F9F5EC;
--color-ink:        #1A1612;
--color-ink-muted:  rgba(26, 22, 18, 0.5);
--color-border:     rgba(26, 22, 18, 0.15);
```

No other colors. Photography provides all warmth.

### Motion Principles
- Scroll-triggered image reveals: fade up, 600–800ms
- Hover on project cards: subtle lift, border darkens
- Page transitions: crossfade — like turning a page, not swiping
- Specimen field underlines draw in on first view

### Spatial Principles
- Generous negative space — the label needs room to breathe
- Max content width: 1200px centered
- Specimen cards: consistent internal padding (2rem–3rem)
- Grid is slightly irregular — archival, not manufactured

---

## CMS Schema (Sanity)

| Type | Key Fields |
|---|---|
| Project | title, category, archiveNumber, originally, provenance, period, composition, styleDescription, heroImage, topNotes[], heartNotes[], baseNotes[], featured, publishedAt, slug |
| Testimonial | quote, clientName, projectName, projectType, date |
| Archivist | originally, provenance, practice, currently, photo, instagramUrl, bodyText |
| SiteConfig | featuredProject, tagline, contactEmail |

---

## Technical Architecture

```
notesbyshin/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── work/[slug]/page.tsx     # Project page
│   ├── sillage/page.tsx         # Testimonials
│   ├── archivist/page.tsx       # About
│   └── inquire/page.tsx         # Contact
├── components/
│   ├── SpecimenCard.tsx          # Reusable label component
│   ├── ProjectGrid.tsx           # Filterable grid
│   ├── ThreeMovements.tsx        # Top/heart/base gallery
│   ├── SillageCard.tsx           # Testimonial card
│   └── InquireForm.tsx           # Contact form
├── lib/
│   ├── sanity.ts                # CMS client
│   └── queries.ts               # GROQ queries
└── styles/
    └── globals.css              # Design tokens, base styles
```

**Key decisions:**
- Next.js 14 App Router, static generation with ISR for CMS pages
- Tailwind CSS with custom design tokens in config
- Sanity CMS with GROQ queries
- Next.js Image for WebP optimization + blur placeholder
- GSAP or Framer Motion for scroll-triggered reveals
- Resend for contact form email delivery
- Deployed on Vercel

---

## Success Metrics

| Metric | Target | Timeframe |
|---|---|---|
| Inquiries via form | 3–5 / month | Month 1–2 |
| Avg. session duration | > 2 minutes | Ongoing |
| Project pages per session | > 2 | Ongoing |
| Sillage scroll depth | > 60% reach it | Ongoing |
| Mobile layout integrity | Zero breaks | Launch |

**North star:** Inquiries that reference the concept ("I loved the archive structure", "saw your KCF work") signal the concept is filtering correctly.

---

## Constraints

| Constraint | Detail |
|---|---|
| Budget | Minimal — Vercel free, Sanity free, Resend free tier |
| Timeline | Quality over speed — no hard deadline |
| Accessibility | WCAG 2.1 AA — forms keyboard navigable, all images have alt text |
| Performance | Lighthouse > 90 mobile — Next.js Image handles image risk |
| Browser support | Chrome, Safari, Firefox (latest 2). Safari mobile is primary — NY creative scene is heavily iPhone |

---

## Open Questions

- **Font licensing:** Courier Prime is free and good. Pitch or GT America Mono are better but cost ~$50–200 one-time. Decide before build.
- **Archivist photo:** Need an editorial photo of Alvin that fits the site's tone.
- **Archive numbering order:** By date shot, date published, or manually curated? Affects how the archive feels as it grows.
- **KCF work:** In the main public archive or a separate section? Some community work may not serve as commercial portfolio pieces.
- **Video hosting:** Vimeo free (5GB limit) vs YouTube unlisted. Affects videography project experience quality.

---

## MVP Definition of Done

- [ ] All P0 features implemented and working
- [ ] All content editable via CMS without touching code
- [ ] Contact form sends emails reliably
- [ ] Lighthouse > 90 on mobile
- [ ] Tested: iPhone Safari, Chrome desktop, Firefox desktop
- [ ] All images have meaningful alt text
- [ ] No placeholder content anywhere
- [ ] notesbyshin.com pointing to Vercel deployment
- [ ] Full user journey works end-to-end: land → browse project → read sillage → inquire

---

## Next Steps

1. Finalize font decision (Courier Prime vs licensed alternative)
2. Set up Sanity — create schema from content types above
3. Build design system — CSS tokens + SpecimenCard component first
4. Build homepage — master label + project grid
5. Build project page — specimen + three movements gallery
6. Build Sillage, Inquire, Archivist
7. Populate with real content
8. QA + launch

---

*PRD Version: 1.0*  
*Status: Ready for Technical Design*  
*Owner: Alvin Shin — notesbyshin*
