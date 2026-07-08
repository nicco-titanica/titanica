# CLAUDE.md

Working instructions for Claude Code (and any AI collaborator) in the Titanica repository.

## The one rule above all others

Before building anything, answer the **Decision Rule** from [`docs/00-CONSTITUTION.md`](docs/00-CONSTITUTION.md):

> **Does this strengthen Titanica as a permanent House of Intelligence?**
> If the answer is no, we do not build it.

The Constitution is not marketing copy. It is the specification. When a technical choice conflicts with it, the Constitution wins.

## Priority ladder (use to resolve any conflict)

- Truth > speed
- Quality > quantity
- Catalog > growth
- The institution > any individual Work
- Long-term trust > short-term attention

Complexity is **clarified, never simplified**. Beauty is a feature, not decoration — it increases attention and respect for the reader.

## The docs are the source of truth

`docs/` is canonical. **Read all of `00`–`06` before writing code.** If code and docs disagree, the docs win — fix one deliberately, never let them silently drift.

1. `00-CONSTITUTION.md` — governs everything (the Decision Rule + priority ladder)
2. `01-PRODUCT.md` — what the House sells; the cohort (first 50 free, #51 pays)
3. `02-ARCHITECTURE.md` — the stack + the single-system decision (**the build bible**)
4. `03-DATABASE.md` — the model: Kingdom → Domain → Work, Lens, Member, Nomination
5. `04-DESIGN.md` — the visual language + the design tokens
6. `05-UX.md` — behavior, flow, the threshold, the membrane
7. `06-ROADMAP.md` — the gated build order

`STAGE-0-KICKOFF.md` starts the build.

## Domain language (use precisely in code and copy)

**Catalog, Kingdom, Domain, Work, Lens, Member, Nomination** — these are defined terms from
`03-DATABASE.md`, not loose synonyms. A Work's **frozen code** (`I.FL.004`) and **slug** are
permanent identity. `thesis` = public depth, `apparatus` = member depth — the **membrane**
between them is a server-boundary rule, never styling (`02 §3`).

## Stack (locked — `02-ARCHITECTURE.md`)

- **ONE system:** Payload CMS v3 owns content *and* membership *and* auth, over a single Postgres.
- Next.js (App Router, RSC) · Payload v3 · Postgres (self-hosted, Hetzner) · Meilisearch ·
  Resend · Stripe (deferred) · PostHog (EU) · Cloudflare R2 · Docker + Coolify + Hetzner.
- Monorepo: **pnpm workspaces + Turborepo**. (`pnpm` is provided via `corepack` in this env.)

## Repository layout

```
titanica/
├── docs/            # canonical spec (source of truth)
├── apps/
│   └── web/         # Next.js + Payload v3 — the whole v1 app
└── packages/
    └── ui/          # shared UI component library
```

## Working rules

- **Gate-based.** Build only the current Stage (`06-ROADMAP.md`). Do not scaffold ahead.
- **Branch + PR.** Work on a feature branch and open a PR. **Confirm before pushing to the remote.**
- Prefer permanence: stable URLs, durable schemas, no throwaway abstractions.

## Do NOT

- Do NOT add **Prisma** or **Better Auth** — they are a documented *extraction path* for later, not v1.
- Do NOT invent product/editorial decisions (formats, cohort logic, content — all in the docs).
  Where a doc marks something open or dormant, leave it exactly as specified.
- Do NOT use pure white (`#FFFFFF`), gradients, or decorative shadows (`04-DESIGN.md`).
- Do NOT build engagement dark patterns (infinite scroll, streaks, badges, dwell optimization).
