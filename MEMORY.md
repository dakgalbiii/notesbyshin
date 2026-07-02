# MEMORY.md — notesbyshin Project State

> Update this file at the end of each session or after completing a phase.
> Keep it current — stale state is worse than no state.

---

## 🏗️ Active Phase & Goal

**Phase 1 — Design System + SpecimenCard**

Goal: Establish CSS design tokens, Tailwind config, font loading, and the SpecimenCard component family before any pages exist.

Started: 2026-05-27
Completed: —

---

## ✅ Completed Phases

*(none yet — starting from scratch)*

---

## 🔧 Current Environment

| Item | Status |
|---|---|
| Next.js app | Initialized (Create Next App) |
| Tailwind CSS | Installed, not yet configured for design tokens |
| Sanity | Not yet set up |
| Resend | Not yet set up |
| Vercel | Not yet deployed |
| Domain | notesbyshin.com (not yet pointed) |
| Fonts | Default — Courier Prime not yet loaded |

---

## 📝 Open Decisions

- [ ] **Font:** Courier Prime (free) to start; decide on Pitch by Klim ($60) before launch
- [ ] **Archivist photo:** Need an editorial portrait of Alvin in the site's tone
- [ ] **Archive numbering:** By date shot, date published, or manually curated?
- [ ] **KCF work:** In main public archive or separate/hidden section?
- [ ] **Video hosting:** Vimeo free (5GB) vs YouTube unlisted

---

## 🚨 Known Issues

*(none yet)*

---

## 📦 Key Dependencies (to install)

```bash
npm install gsap @gsap/react           # Scroll-triggered reveals
npm install framer-motion              # Page transitions
npm install @sanity/client groq        # Sanity CMS
npm install @sanity/image-url          # Image URL builder
npm install next-sanity                # Next.js + Sanity integration
npm install resend                     # Email delivery
npm install @react-email/components    # Email templates
```

---

## 🗒️ Session Notes

### 2026-05-27
- PRD and Tech Design finalized
- AGENTS.md, CLAUDE.md, MEMORY.md, REVIEW-CHECKLIST.md generated
- agent_docs/ created with tech_stack.md, project_brief.md, product_requirements.md, testing.md
- Ready to begin Phase 1: Design System + SpecimenCard
