# REVIEW-CHECKLIST.md — notesbyshin Pre-Launch Review

Run through this checklist before marking the MVP done and pointing the domain.

---

## Features

- [ ] Homepage: master label renders with correct typographic hierarchy
- [ ] Homepage: featured project fields pull from Sanity (pinnable)
- [ ] Homepage: project grid shows all published projects, filterable by category
- [ ] Homepage: grid responsive — 2 col mobile / 3 col tablet / 4 col desktop
- [ ] Project page: specimen card renders all fields (Originally, Provenance, Period, Composition, Style Description)
- [ ] Project page: three-movement gallery with labeled section dividers
- [ ] Project page: GSAP scroll reveal animations working
- [ ] Project page: prev/next project navigation at bottom
- [ ] Sillage: 4–6 testimonials rendered from CMS
- [ ] Sillage: masonry/staggered layout (not a carousel)
- [ ] Inquire: field labels use specimen vocabulary
- [ ] Inquire: email sent to Alvin on submission
- [ ] Inquire: confirmation email sent to client
- [ ] Inquire: graceful validation, no jarring errors
- [ ] Inquire: fully keyboard navigable, ARIA labels on all inputs
- [ ] Archivist: specimen card for bio fields
- [ ] Archivist: editorial photo of Alvin
- [ ] Archivist: links to Instagram
- [ ] Navigation: WORK / SILLAGE / ARCHIVIST / INQUIRE — lowercase, active state
- [ ] Navigation: notesbyshin wordmark links home
- [ ] Navigation: mobile nav works cleanly

---

## Content

- [ ] All content editable via Sanity — no hardcoded text
- [ ] No placeholder content anywhere (no "Lorem ipsum", no "TODO")
- [ ] All images have meaningful alt text (not "image" or filename)
- [ ] Real photos in all three movements of at least one project
- [ ] Sillage has real client testimonials (4–6)
- [ ] Archivist has real bio content and photo

---

## Performance

- [ ] Lighthouse mobile score > 90 (all pages)
- [ ] LCP < 2.5s on mobile
- [ ] All images served as WebP
- [ ] next/image used everywhere — no raw `<img>` tags
- [ ] Fonts loaded via next/font — no FOUT

---

## Code Quality

- [ ] `npm run build` passes — zero errors
- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npm run lint` — zero ESLint errors
- [ ] No `any` types in codebase
- [ ] No hardcoded hex values — all colors from CSS custom properties
- [ ] `.env.local` not committed; `.env.example` committed with empty values

---

## Accessibility

- [ ] WCAG 2.1 AA compliance
- [ ] All form inputs have ARIA labels
- [ ] All images have alt text
- [ ] Keyboard navigation works through all interactive elements
- [ ] Color contrast meets AA on paper background

---

## Browser Testing

- [ ] iPhone Safari (primary — NY creative scene is heavily iPhone)
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Responsive: 375px / 768px / 1280px breakpoints

---

## Security

- [ ] `SANITY_API_TOKEN` not exposed to client (server-side only)
- [ ] Contact form rate-limited (`@upstash/ratelimit` or equivalent)
- [ ] Honeypot field added to inquiry form
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in git history

---

## Launch

- [ ] Sanity Studio deployed (sanity.io/manage or custom subdomain)
- [ ] Vercel deployment live on production branch
- [ ] notesbyshin.com → Vercel (DNS configured)
- [ ] SSL active (Vercel handles this automatically)
- [ ] Full user journey tested: land → browse project → read sillage → inquire
- [ ] Alvin receives a test inquiry email and can reply
