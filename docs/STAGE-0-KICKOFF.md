# STAGE 0 — BUILD KICKOFF (for Claude Code)

You are the Founding Engineer on Titanica. This file starts the build. Read it fully,
then read the governing documents, then begin — and nothing more than — Stage 0.

---

## What Titanica is

A **members-only House of Intelligence** — a permanent institution that organizes knowledge
into a compounding Catalog. It is **not** a publication or a subscription. This is a
ground-up rebuild on a custom stack (abandoning Ghost).

---

## Read first — the seven governing documents (`docs/`, in order)

These are the complete, authoritative specification. **Read all seven before writing any
code.** They supersede any earlier drafts in the repo. If code and docs ever conflict, the
docs win.

- `00-CONSTITUTION.md` — the Decision Rule + priority ladder. Governs every choice.
- `01-PRODUCT.md` — what the House sells; the cohort (first 50 free, #51 pays).
- `02-ARCHITECTURE.md` — the stack and the single-system decision. **Your build bible.**
- `03-DATABASE.md` — the model: Kingdom → Domain → Work, Lens, Member, Nomination.
- `04-DESIGN.md` — the visual language and the design tokens.
- `05-UX.md` — behavior, flow, the threshold, the membrane.
- `06-ROADMAP.md` — the gated build order. **You are executing Stage 0.**

**Do not invent product or editorial decisions.** They are already made in the docs. Where a
doc marks something open or dormant, leave it exactly as specified — do not fill it in.

---

## The Decision Rule (from `00`)

Before building anything, ask: *Does this strengthen Titanica as a permanent House of
Intelligence?* If no, do not build it. Priority ladder: **Truth > speed · Quality > quantity
· Catalog > growth · Institution > individual Works · Long-term trust > short-term
attention.** Complexity is *clarified, never simplified*.

---

## Your task: STAGE 0 — Foundation (`06 §2`)

Deliver, in this order:

1. **Scaffold** Next.js (App Router, React Server Components) with **Payload CMS v3**
   embedded, inside the existing monorepo (`apps/web`; pnpm workspaces + Turborepo).
2. **Postgres** via Docker — local dev through a `docker-compose` that mirrors production.
3. **Design tokens** from `04 §10`: `--ink #1C1A16`, `--paper #F2EEE5`, `--red #C02D1C`
   (closed set — **no `#FFFFFF`**); Bodoni Moda 500 for display, Libre Franklin for text
   (**never italic**); the type scale and space scale per `04 §4`, `§7`.
4. **Deploy the skeleton** to Hetzner via Coolify on a subdomain (e.g. `staging.titani.ca`)
   — live, empty, with the palette and type already in place.

**Definition of Done:** the app runs locally *and* deploys to Hetzner as a live, empty
skeleton carrying the palette and type. Nothing more.

---

## Architecture reminders (from `02`)

- **ONE system.** Payload owns content *and* membership *and* auth, over a single Postgres.
  **Do not add Prisma or Better Auth** — they are a documented extraction path for later,
  not part of v1.
- **The membrane is a server-boundary rule**, not styling: member-depth content must never
  reach a non-member's client (RSC + Payload field-level access). This matters from Stage 2;
  scaffold with it in mind.
- **Stack (locked):** Next.js, Payload v3, Postgres (self-hosted, Hetzner), Meilisearch,
  Resend, Stripe (deferred), PostHog (EU), Cloudflare R2, Docker + Coolify + Hetzner.

---

## Working rules

- **Gate-based.** Do Stage 0 only. Do **not** build Stages 1–6.
- **Branch + PR.** Work on a feature branch and open a PR. **Confirm before pushing to the
  remote.**
- Ensure `docs/00`–`06` are committed (they supersede any prior drafts).
- Preserve monorepo hygiene (pnpm workspaces + Turborepo).

## Do NOT

- Scaffold beyond Stage 0.
- Add Prisma or Better Auth.
- Invent product/editorial decisions (formats, cohort logic, content — all in the docs).
- Use pure white, gradients, or decorative shadows (`04`).

---

When Stage 0's Definition of Done is met, stop and report. Stage 1 begins only on the
founder's word.
