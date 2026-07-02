# Project Brief (Persistent)

> This document captures ongoing project conventions, workflow expectations, and quality gates.
> Update it as the project scales. If a rule changes, update it here — don't leave stale guidance.

---

## Product Vision

**notesbyshin** inverts the standard portfolio formula. Instead of transparent containers that let the work speak for itself, the container *is* the differentiator. A prospective client who feels the Maison Margiela Replica reference self-selects — they are already the right client.

Every UI element — navigation, project cards, contact form — uses the vocabulary of a specimen/archive label. The concept is the filter.

---

## Coding Conventions

### Naming

| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `SpecimenCard.tsx`, `ThreeMovements.tsx` |
| Hooks | camelCase with `use` prefix | `useScrollReveal.ts` |
| Query constants | SCREAMING_SNAKE_CASE | `ALL_PROJECTS_QUERY` |
| CSS variables | `--kebab-case` | `--color-paper`, `--specimen-padding` |
| Tailwind classes | Use semantic token classes | `bg-paper text-ink` not `bg-[#F4EFE6]` |
| Files | Match component name exactly | `SpecimenCard.tsx` not `specimen-card.tsx` |

### TypeScript

- Strict mode — no exceptions
- No `any` — use `unknown` with type guards or Zod for external data
- All component props must have explicit interfaces (not inline `{}`)
- Return types on all functions that return non-obvious values

### Component Structure

```typescript
// Standard component file structure:
// 1. Imports
// 2. Types/interfaces
// 3. Component function (named, not anonymous arrow)
// 4. Export at bottom

interface Props {
  // ...
}

export function SpecimenCard({ title, fields }: Props) {
  // ...
}
```

### File Organization

- One component per file
- Co-locate related components in subdirectories (`specimen/`, `gallery/`, etc.)
- Shared types go in `types/` if needed
- Utilities go in `lib/`

---

## Design Vocabulary

These terms are used throughout the codebase and copy. Use them consistently:

| Term | Meaning in context |
|---|---|
| Specimen card | The main UI container — looks like a Margiela label |
| Originally | Client/subject name field label |
| Provenance | Location field label |
| Period | Date field label |
| Composition | What the project captured / what the client envisions |
| Style Description | Mood, additional context |
| Top Notes | First movement of a project — bold, immediate images |
| Heart Notes | Second movement — emotional core |
| Base Notes | Third movement — details, craft, what lingers |
| Sillage | The trail a fragrance leaves — testimonials page |
| Archivist | About page — Alvin as the keeper of the archive |
| Replica | A single project — a reproduction of a moment |

---

## Quality Gates

Before marking any task or phase complete:

1. `npm run build` passes — zero errors
2. `npx tsc --noEmit` passes — zero TypeScript errors
3. `npm run lint` passes — zero ESLint errors
4. Open localhost:3000 in a real browser — verify the feature visually
5. Check on iPhone Safari viewport (375px) — mobile is primary for this audience
6. All images have meaningful `alt` text
7. No `console.log` left in committed code

---

## Git Workflow

```
main          ← production (Vercel auto-deploys on push)
  └── dev     ← integration
        ├── feature/phase-1-design-system
        ├── feature/phase-2-homepage
        └── feature/phase-3-sanity-cms
```

Commit message format:
- `feat: add SpecimenCard component`
- `fix: correct underline draw-in timing on Safari`
- `chore: install gsap dependency`
- `style: update paper color token`

One feature per commit. Do not bundle unrelated changes.

---

## Update Cadence

Refresh this brief when:
- A new phase begins (update the roadmap in AGENTS.md)
- A convention changes (update the relevant section here)
- A new dependency is added (update MEMORY.md dependencies list)
- An open decision is resolved (update MEMORY.md open decisions)

---

## Audience Context

- **Primary browser:** iPhone Safari — NY creative scene is heavily iPhone. Test here first.
- **Primary visitor:** Prospective clients arriving from Instagram or referral
- **Creative literacy:** High — design directors, engaged couples who care about aesthetics, event brands
- **Self-selection:** The Margiela concept is a filter. Visitors who feel it are already the right client. Don't soften it.
