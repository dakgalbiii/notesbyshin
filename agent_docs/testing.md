# Testing Strategy

> Run these checks after every feature. Fix failures before moving to the next task.
> The goal isn't test coverage numbers — it's confidence that each feature works before building on top of it.

---

## Verification Loop (Required After Every Change)

1. `npm run dev` — confirm dev server starts without errors
2. Open localhost:3000 in a real browser (not just trust the terminal)
3. Click through the affected feature manually
4. Check at 375px width (iPhone Safari viewport) — mobile is primary
5. Check at 1280px width (desktop)
6. `npx tsc --noEmit` — zero TypeScript errors
7. `npm run lint` — zero ESLint errors

Do not move to the next task until all seven pass.

---

## Build Check (Required Before Every Commit)

```bash
npm run build
```

`next build` must complete with zero errors. TypeScript errors surface here if missed earlier.

---

## Manual Checks by Feature

### Phase 1 — Design System + SpecimenCard

- [ ] Paper background (`#F4EFE6`) visible on page
- [ ] Courier Prime loaded — field values render in monospace
- [ ] Condensed sans loaded — labels render narrow and tracked
- [ ] SpecimenCard renders with correct padding and border
- [ ] Underline draw-in animation fires on page load (check in browser, not just DevTools)
- [ ] Tokens used in Tailwind classes (`bg-paper`, `text-ink`) — not raw hex values

### Phase 2 — Homepage

- [ ] Master label renders at top with wordmark + subtitle + specimen fields
- [ ] Project grid renders with mock data
- [ ] Category filter buttons work (show/hide correct cards)
- [ ] Grid is 2 col / 3 col / 4 col at correct breakpoints
- [ ] Hero images on cards load (lazy, with blur placeholder)
- [ ] Hover state on cards: lift + border darken

### Phase 3 — Sanity CMS

- [ ] `npx sanity dev` starts Studio at localhost:3333
- [ ] Can create a new Project document in Studio
- [ ] Homepage pulls project from Sanity (not mock data)
- [ ] Toggling `featured: true` on a project updates the master label
- [ ] ISR revalidation: update a field in Sanity → wait 60s → refresh → change appears

### Phase 4 — Project Page

- [ ] Navigating to `/work/[slug]` renders the correct project
- [ ] Specimen card shows all fields from Sanity
- [ ] Three-movement gallery renders all three sections with dividers
- [ ] GSAP scroll reveals fire as images enter viewport (not all at once on load)
- [ ] Pacing is different between Top, Heart, and Base notes (tighter vs. spacious)
- [ ] Prev/next project navigation works (correct slugs)
- [ ] Mobile: single column, full-bleed images

### Phase 5 — Sillage + Archivist

- [ ] Sillage: 4–6 testimonials render from Sanity
- [ ] Sillage: section header "sillage" + subtitle "the trail left behind"
- [ ] Sillage: masonry/staggered layout (not a carousel)
- [ ] Archivist: specimen card bio fields render
- [ ] Archivist: editorial photo renders with `next/image`
- [ ] Archivist: Instagram link works

### Phase 6 — Inquire

- [ ] Form renders with specimen-card field labels
- [ ] Required field validation works (name, email, vision minimum)
- [ ] Test submission sends email to Alvin's address
- [ ] Test submission sends confirmation to the address entered
- [ ] Confirmation state renders — not a generic message
- [ ] Keyboard navigation: tab through all fields, submit with Enter
- [ ] All inputs have ARIA labels (inspect in DevTools > Accessibility)

### Phase 7 — Polish

- [ ] Navigation highlights active page (subtle underline or dot)
- [ ] Page transitions: crossfade on route change (not flash/jump)
- [ ] Framer Motion AnimatePresence wraps page content at root layout
- [ ] Lighthouse mobile audit > 90 on homepage
- [ ] Lighthouse mobile audit > 90 on a project page

---

## Browser Test Matrix

Test in this order — Safari mobile is highest priority:

| Browser | Device | Priority |
|---|---|---|
| Safari | iPhone (375px) | 🔴 Critical |
| Chrome | Desktop (1280px) | 🟡 High |
| Safari | Desktop Mac | 🟡 High |
| Firefox | Desktop (1280px) | 🟢 Standard |

**Known risk:** GSAP ScrollTrigger can behave differently on Safari. Test on a real iPhone, not just DevTools device emulation.

---

## Performance Check (Run After First Real Content)

```bash
# Run Lighthouse in Chrome DevTools:
# DevTools → Lighthouse → Mobile → Generate report

# Target scores:
# Performance:    > 90
# Accessibility:  > 90
# Best Practices: > 90
# SEO:            > 90
```

Common issues and fixes:
- **Low performance:** Images not using `next/image`, or not setting correct `width`/`height`
- **Low accessibility:** Missing `alt` text, inputs without labels, low color contrast
- **LCP slow:** Hero image not preloaded — add `priority` prop to above-fold `next/image`

---

## Pre-Commit Checklist

Before every `git commit`:

- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] No `console.log` in staged files
- [ ] `.env.local` not staged (`git status` check)
- [ ] Commit message follows format: `feat:`, `fix:`, `chore:`, `style:`

---

## No Automated Tests (MVP Scope)

The MVP does not include Jest, Playwright, or Cypress. The verification loop above + manual browser checks are the test strategy for MVP.

Add automated tests post-launch if:
- The contact form has recurring breakages
- CMS schema changes are causing regressions
- Multiple contributors start working on the site
