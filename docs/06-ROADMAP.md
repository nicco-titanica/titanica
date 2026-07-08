# 06 — ROADMAP

Status: **PROPOSED (v0.1)** — governing document, awaiting founder ratification
Derives from: all of `00`–`05`
Marks: the **concept front complete.** Once this is ratified, the documentation phase is
closed and building begins.

> The order is fixed and gated. Each stage ships something coherent and depends on the one
> before it. We build the **permanent spine before the growth mechanics** — *Catalog >
> growth* (Constitution) — so nomination, application, and billing are deferred stages, not
> launch work. Nothing is scaffolded before `02-ARCHITECTURE` is ratified.

---

## 1. How to read this

Each stage below names four things: what it **delivers**, what it **depends on**, the
**founder-gate** (the decision that must be made before it can be built, if any), and its
**Definition of Done**. Stages 0–5 are the v1 build, serving Phase 0 of the product. Stage 6
is deferred — sequenced against later product phases.

**Product phase → build stage:**

- **Phase 0 — Seeding** (invite ~50, unpaid, opaque door) → Stages 0–5.
- **Phase 1 — Taking root** (spontaneous word of mouth) → no build; a diagnostic (`01 §5`).
- **Phase 2 — Controlled nomination** → Stage 6a.
- **Phase 3 — Public application** → Stage 6b. Billing → Stage 6c.

---

## 2. The stages

### Stage 0 — Foundation

- **Delivers:** Next.js + Payload v3 scaffold; Postgres via Docker/Coolify/Hetzner; the
  design tokens (`04 §10`); repo committed with `00`–`06`.
- **Depends on:** `02-ARCHITECTURE` ratified. *(This is the gate.)*
- **Founder-gate:** the design values that become tokens — type-scale numbers and the
  Bodoni size floor (`04 §11.1`). Defaults are proposed; confirm or tune.
- **Done:** the app runs locally and deploys to Hetzner as a live, empty skeleton with the
  palette and type in place.

### Stage 1 — The Catalog spine

- **Delivers:** Payload collections Kingdom, Domain, Work, Lens (`03 §10.1`); the 5 Kingdoms
  and 25 Domains seeded; the frozen-code mint hook (`03 §3.2`); visibility fields and their
  invariant hooks — precedence and `NEVER` (`03 §4`, `§7`).
- **Depends on:** Stage 0.
- **Founder-gate — RESOLVED:** all five formats active from day one; member-only Works
  (`publicMode = NEVER`, i.e. Dossiers) ship in v1 (`03 §3.4`, `§4`).
- **Done:** a Work can be authored, is minted a frozen code, and its visibility invariants
  hold.

### Stage 2 — Two depths & the public vitrine

- **Delivers:** Work rendering in both depths — `thesis` public, `thesis + apparatus`
  member — with the membrane at the server boundary (`02 §3`); the public curated window
  (`03 §4.1`); the design language applied (`04`).
- **Depends on:** Stage 1.
- **Founder-gate — RESOLVED:** thin vitrine — public sees Dispatch `thesis` + an apply door,
  membership opaque (`05 §10`); Bodoni italic lifts one word in a headline; imagery in two
  registers, exhibit plate now / photography soon (`04 §3`, `§9`).
- **Done:** a public visitor sees the vitrine; the `apparatus` is provably absent from the
  delivered payload for non-members.

### Stage 3 — The threshold & membership

- **Delivers:** the auth-enabled Member collection with **ordinal cohort** (first 50 =
  FOUNDING, §5); the **House-validated admission flow** — invite *and* application, never
  self-serve (`05 §3`); the threshold as induction via Resend; cohort tracked in the back.
- **Depends on:** Stage 2 (there must be depth to admit someone *into*).
- **Founder-gate — RESOLVED:** "how I think" stays inside `apparatus` (no extra surface);
  the threshold is slow and House-validated; FOUNDING is tracked in the back, not surfaced
  (`03 §5`, `05 §3`, `§10`).
- **Done:** an invited *or* validated-applicant person crosses the threshold, is assigned
  its cohort by ordinal, and reads the full apparatus.

### Stage 4 — Catalog navigation & search

- **Delivers:** navigation on both axes — Kingdom/Domain and Lens (`03 §3`); member totality
  (all Works + archive); Meilisearch, two scopes, membrane-safe (`03 §8`).
- **Depends on:** Stage 3.
- **Founder-gate:** none founder-owned (Meilisearch shape is architecture, `02 §11.3`).
- **Done:** a member navigates the whole Catalog both ways; search returns nothing from the
  member scope to an unauthenticated request.

### Stage 5 — Precedence ritual & permanence

- **Delivers:** the precedence reveal as a marked moment (`05 §4`); the code→slug permanent
  redirect and the permanence-aware sitemap (`02 §4`).
- **Depends on:** Stage 4.
- **Founder-gate — RESOLVED (dormant):** precedence is not exercised at launch (Dispatches
  public, Dossiers member-only), so the gap sits at a dormant uniform ~72h default until the
  first member-first release (`03 §11.1`, `05 §4`).
- **Done:** a member receives a Work before the public as a ceremony, not a flag; every code
  resolves to its slug permanently.

**End of v1. Phase 0 is fully served.** Growth mechanics begin only when the room is real.

### Stage 6 — Deferred (growth mechanics, later phases)

- **6a — Nomination** (serves Phase 2): the scarce nomination right, the candidacy flow, the
  House-controlled admission (`03 §6`, `05 §8`). **Founder-gate:** refund policy
  (`03 §11.3`).
- **6b — Public application** (serves Phase 3): the public door, *"One does not enter. One
  is chosen."* (`01 §5`).
- **6c — Billing** (Stripe): activates at the **51st member** (`01 §7`, `03 §9`) — a count,
  not a phase. **Scheduling constraint:** the billing seam must be ready *before the 50th
  seat fills*, since #51 pays on arrival; so 6c may need to precede 6a/6b if the cohort fills
  fast. It is **not** the Prisma extraction trigger — a single flat tier stays inside Payload
  (`02 §1`).

---

## 3. The founder-decision calendar

Nearly everything is now decided. State:

| Gates | Decision | Status |
|---|---|---|
| Stage 0 | Type-scale numbers, Bodoni size floor | Defaults stand; tune in-browser (`04 §11`) |
| Stage 1 | Formats; member-only Works | **Resolved** — all five active; Dossiers ship (`03 §3.4`, `§4`) |
| Stage 2 | Door; Bodoni italic; imagery | **Resolved** — thin vitrine; one-word italic; two image registers |
| Stage 3 | "How I think"; threshold; FOUNDING | **Resolved** — in `apparatus`; validated/slow; back-only |
| Stage 3 | Cohort & monetization boundary | **Resolved** — ordinal, first 50 free, #51 pays (`01 §2`, `03 §5`) |
| Stage 5 | Precedence gap | **Resolved (dormant)** — ~72h default, unused at launch |
| Stage 6a | Nomination refund | **Resolved** — no refund (`03 §7.5`) |

Architecture-owned (defaults proposed, `02 §11`): staging environment, VPS/DB split,
Meilisearch shape, backup cadence, extraction trigger. No founder decision needed now.

**What genuinely remains — editorial, and only the founder can supply it:** the launch
Catalog and the founding list (§5).

---

## 4. What is deliberately NOT in v1

Restraint is the discipline (`05 §7`). v1 does not build: the peer circle (a promise seeded
toward, not a room — `01 §3`), bespoke intelligence, nomination, public application, or
billing. Faking any of these — an empty community, a members directory that reveals
thinness — would damage the patent more than their absence. v1 builds the spine and the
threshold, and nothing that would betray how few are inside.

---

## 5. What remains — editorial, founder-only

1. **Launch Catalog — mostly set.** Titanica is already live with 3 Dispatches; this
   version launches with **5 Dispatches (public) + 2 Dossiers (member-only)**. Open only:
   *which Domains* the 2 new Dispatches and 2 Dossiers occupy, so the vitrine proves range
   across Kingdoms, not depth in one.
2. **Founding cohort list** — the actual ~50 (up to `FOUNDING_CAP = 50`), hand-picked. The
   only real asset (`01 §2`), and the true bottleneck: the code will be ready before the
   list is. Composition work that runs in parallel to Stages 0–2. *Founder.*
