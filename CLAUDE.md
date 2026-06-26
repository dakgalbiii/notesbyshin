@AGENTS.md

---

## Claude Code Directives

- **Plan Mode first:** Use `/plan` before implementing any new feature or phase. Propose an approach and wait for approval.
- **Active phase check:** If asked to "start building" without a specific task, check the Active Phase section in AGENTS.md above.
- **Browser verify:** Run `npm run dev` and open localhost:3000. Do not mark UI tasks complete without visual confirmation.
- **agent_docs/ first:** Before writing a new component or query, check `agent_docs/tech_stack.md` — the pattern may already be defined.
- **TypeScript errors:** Zero tolerance. Fix, don't suppress.
- **One commit per feature:** Use `feat:`, `fix:`, `chore:`, `style:` prefixes.
