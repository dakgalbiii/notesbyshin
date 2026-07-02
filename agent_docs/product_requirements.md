# Product Requirements

> Complete feature list and acceptance criteria extracted from the PRD.
> This is the contract — do not add features or simplify acceptance criteria without Alvin's approval.

---

## User Journey

**Discovery → First Impression → Browse → Inquire**

1. Arrives via Instagram, Google, or referral. Lands on homepage.
2. Reads the master label. Gets the concept immediately or reads it twice. Both are fine.
3. Browses the project grid — each card is a miniature specimen label.
4. Opens a project. Sees the full specimen card, then photographs unfold in three movements.
5. Reads Sillage. Testimonials as archival field notes — social proof without feeling transactional.
6. Hits Inquire. The contact form is itself a specimen card — they fill in their own Replica.
7. Alvin receives a contextual, already-creative inquiry.

---

## Work Categories

| Prefix | Category |
|---|---|
| W— | Weddings |
| P— | Portraits |
| E— | Events |
| V— | Videography |
| C— | Editorial / Creative |
| K— | KCF / Community |

Projects are numbered within category (W-001, W-002) and carry a global archive number (N° 001) for the full grid.

---

## P0 Features — Must Have

### 1. Homepage — The Master Label

The site's identity card. Uses the Margiela label structure.

**Acceptance Criteria:**
- [ ] Master label renders with correct typographic hierarchy (condensed sans wordmark + monospace field values)
- [ ] Featured project fields pull from Sanity CMS (field: `featured: true` — pinnable)
- [ ] Project grid shows all published projects, filterable by category (W / P / E / V / C / K / All)
- [ ] Each card shows: category prefix + number, title, location, year, hero image
- [ ] Grid is responsive: 2 columns mobile, 3 tablet, 4 desktop
- [ ] Grid has a slightly irregular/archival feel — not perfectly uniform manufactured grid

### 2. Project Pages — Specimen + Three Movements

Full specimen card followed by photography in three scroll-triggered sections.

**Acceptance Criteria:**
- [ ] Specimen card renders all CMS fields: Originally, Provenance and Period, Composition, Style Description
- [ ] Three-movement gallery with labeled section dividers ("top notes ···", "heart notes ···", "base notes ···")
- [ ] Images lazy-loaded and optimized via `next/image`
- [ ] Scroll-triggered reveal animations (GSAP ScrollTrigger — fade up, 800ms)
- [ ] Pacing varies by movement: Top (tight, fast), Heart (spaced, slower), Base (maximum breathing room)
- [ ] Mobile: single column, full-bleed images
- [ ] Prev / next project navigation at bottom of page

### 3. Sillage — Testimonials

Client testimonials as archival field notes.

**Acceptance Criteria:**
- [ ] Renders 4–6 testimonials from Sanity CMS
- [ ] Each card: quote, client name, project name/type, date
- [ ] Section header: "sillage" with subtitle "the trail left behind"
- [ ] Masonry or staggered grid layout — NOT a carousel
- [ ] New testimonials addable via Sanity Studio without touching code

### 4. Inquire — A Specimen Card to Fill

Contact form structured as a Replica label.

**Acceptance Criteria:**
- [ ] Field labels match specimen-card vocabulary (see field mapping below)
- [ ] Sends email notification to Alvin on submission
- [ ] Sends confirmation to client — specimen-card aesthetic ("your inquiry has been filed.")
- [ ] Confirmation state feels intentional, not a generic "thank you" message
- [ ] Graceful validation — no jarring error states; inline, subtle
- [ ] Fully keyboard navigable
- [ ] ARIA labels on all inputs

**Field Mapping:**
```
"Originally:"          → name (text input — required)
"Provenance:"          → location (text input)
"Period:"              → eventDate (text input — "october 2025", NOT a date picker)
"Composition:"         → vision (textarea — "what are you envisioning" — required)
"Style Description:"   → notes (textarea — "anything else")
[unlabelled]           → email (email input — required, used for confirmation)
```

### 5. The Archivist — About Page

A specimen card for Alvin.

**Acceptance Criteria:**
- [ ] Specimen card structure for bio fields (Originally, Provenance and Period, Practice, Currently)
- [ ] Editorial photo of Alvin — must fit the site's tone
- [ ] Links to Instagram (and other relevant channels)
- [ ] All content editable via Sanity Studio

### 6. Navigation

**Acceptance Criteria:**
- [ ] Four items: WORK / SILLAGE / ARCHIVIST / INQUIRE — lowercase in display
- [ ] Active state: subtle underline or dot only — nothing heavy
- [ ] Mobile navigation works cleanly (no hamburger menu if avoidable)
- [ ] "notesbyshin" wordmark links to homepage
- [ ] Fixed or sticky header

---

## P1 Features — Post-Launch (Do Not Build in MVP)

- Vimeo embeds within videography project pages (top note before stills)
- Password-protected projects for private client work
- SEO metadata per project (Open Graph images, structured data)
- Light/dark toggle (cream-and-ink inverts to near-black beautifully)

---

## NOT in MVP (Do Not Suggest or Add)

- E-commerce / print sales
- Client delivery galleries
- Booking calendar
- Blog
- Multi-language support

---

## Design System

### Typography

| Role | Font | Usage |
|---|---|---|
| Wordmark / category labels / nav | Helvetica Neue Condensed (or Arial Narrow fallback) | "NOTES", "W—001", nav items |
| Field labels | Same condensed, tracked out | "Originally:", "Provenance:" |
| Field values | Courier Prime (or Pitch if licensed) | The filled-in content |
| Body prose | Humanist sans or same monospace | Archivist page paragraphs |

### Color Palette

```css
--color-paper:     #F4EFE6;   /* Page background */
--color-card:      #F9F5EC;   /* Card background */
--color-ink:       #1A1612;   /* All text */
--color-ink-muted: rgba(26, 22, 18, 0.5);
--color-border:    rgba(26, 22, 18, 0.15);
```

No other colors. Photography provides all warmth and color.

### Motion Principles

- Scroll-triggered image reveals: fade up, 600–800ms, ease-out
- Hover on project cards: subtle lift, border darkens
- Page transitions: crossfade — like turning a page, not swiping (Framer Motion)
- Specimen field underlines draw in on first view (CSS clip-path, IntersectionObserver)

### Spatial Principles

- Generous negative space — the label needs room to breathe
- Max content width: 1200px, centered
- Specimen cards: consistent internal padding (2rem–3rem)
- Grid is slightly irregular — archival, not manufactured

---

## Sanity CMS Schema

### Project

| Field | Type | Description |
|---|---|---|
| title | string | e.g. "sarah & james" |
| slug | slug | auto from title |
| category | string (enum) | Wedding / Portrait / Event / Videography / Editorial / Community |
| archiveNumber | number | Global archive number (N° 001) |
| heroImage | image (hotspot) | Grid card + page hero |
| originally | string | e.g. "sarah & james, wedding" |
| provenance | string | e.g. "hudson valley" |
| period | string | e.g. "october 2024" |
| composition | string | e.g. "golden hour, vows, family" |
| styleDescription | string | Mood / additional descriptor |
| topNotes | image[] | First movement images |
| heartNotes | image[] | Second movement images |
| baseNotes | image[] | Third movement images |
| featured | boolean | Pin to homepage master label |
| publishedAt | datetime | Gates visibility in grid |

### Testimonial

| Field | Type |
|---|---|
| quote | text |
| clientName | string |
| projectName | string |
| projectType | string |
| date | string |
| order | number |

### Archivist

| Field | Type |
|---|---|
| originally | string |
| provenance | string |
| practice | string |
| currently | string |
| photo | image |
| instagramUrl | string |
| bodyText | text |

### SiteConfig

| Field | Type |
|---|---|
| featuredProject | reference → Project |
| tagline | string |
| contactEmail | string |

---

## Success Metrics

| Metric | Target |
|---|---|
| Inquiries via form | 3–5 / month (months 1–2) |
| Avg session duration | > 2 minutes |
| Project pages per session | > 2 |
| Sillage scroll depth | > 60% reach it |
| Mobile layout integrity | Zero breaks at launch |

**North star signal:** Inquiries that reference the concept ("I loved the archive structure", "saw your KCF work") mean the concept is filtering correctly — that's the goal.

---

## Constraints

| Constraint | Detail |
|---|---|
| Budget | Minimal — Vercel free, Sanity free, Resend free tier. ~$1.50/mo ongoing |
| Timeline | Quality over speed — no hard deadline |
| Accessibility | WCAG 2.1 AA — forms keyboard navigable, all images have alt text |
| Performance | Lighthouse > 90 mobile |
| Browser support | Chrome, Safari, Firefox (latest 2 versions). Safari mobile is primary |
