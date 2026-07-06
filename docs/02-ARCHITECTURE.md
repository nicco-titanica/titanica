# 02 — ARCHITECTURE

Status: **PROPOSED (v0.1)** — governing document, awaiting founder ratification
Supersedes: the earlier Supabase-based draft (Supabase is **out**; self-hosted Postgres on
Hetzner is **in**)
Derives from: `00-CONSTITUTION.md`, `01-PRODUCT.md`, `03-DATABASE.md`, `04-DESIGN.md`,
`05-UX.md`
Unlocks: the `apps/web` scaffold — **this is the gate.** Nothing is scaffolded before this
document is ratified.

> The right architecture for a solo founder with AI is not the one with the cleanest
> diagram — it is the one he can *own at 2 a.m.* An unmaintainable stack is a threat to the
> one thing the Constitution places above all else: permanence. Every choice here is made
> against that measure.

---

## 1. The governing decision — one system for v1

**Payload CMS owns everything: content, membership, and auth, over a single Postgres.**
*The less the better.*

The three-system split (Payload for content, Prisma for membership, Better Auth for
identity) is the textbook-correct architecture — for a team. For a solo founder it is the
wrong trade: every added system is another migration story, another failure mode, another
thing to understand when something breaks. And the complexity it serves *does not exist
yet* — in Phase 0 the House invites ~50 people by email, unpaid; billing is deferred
(`03 §9`), nomination arrives in Phase 2. Building a second data layer and a full auth
system for logic months away is over-engineering by definition.

Payload v3 runs *inside* Next.js, uses Postgres, has first-class server-side access
control, and — the decisive fact — **field-level access control** that maps exactly onto
the `thesis` / `apparatus` membrane (`03 §4`). One system carries the whole product.

**Honest cost.** Payload's data layer is less ergonomic than Prisma for application logic;
the nomination / cohort / allowance rules live in collection *hooks* rather than in
relational models, and the invariants (`03 §7`) are application-layer guarantees, not
database constraints. The mitigation is discipline: only Payload writes these tables, and
direct Postgres access is closed.

**The extraction path (deferred, not discarded).** Prisma and Better Auth are the *target*
the day membership earns them. Concrete triggers, named so the decision is not vibes:

- billing turns **complex** — multiple tiers, proration, dunning, or nomination status
  interacting with billing (a *single flat tier* at member #51 does **not** qualify: it
  lives inside Payload as a Stripe webhook + a status field + an access hook), or
- auth needs **passkeys / OAuth / an auth surface decoupled from the CMS**, or
- membership tables exceed a complexity the hook layer makes painful.

Note the deliberate consequence: **monetization starting (member #51, `01 §7`) is not an
extraction trigger.** *The less the better* survives the first paid member. Because Payload
runs on Postgres, extraction — when it comes — is a *contained refactor over the same
database* (lift Member/Nomination into Prisma, move identity to Better Auth), never a
rewrite. The architecture is designed for that day (`03 §10.2`); it simply does not pay for
it early.

---

## 2. The stack (reconciled to the locked list)

| Layer | Choice | Role |
|---|---|---|
| App + rendering | **Next.js** (App Router, RSC) | The application and its server boundary (§3). |
| CMS + membership + auth | **Payload CMS v3** (embedded in Next) | One system (§1). |
| Database | **Postgres**, self-hosted (Hetzner) | The single source of truth. *(Supabase removed.)* |
| Search | **Meilisearch** | Two scopes, membrane-safe (§7). |
| Transactional email | **Resend** | The ceremony channel (§7). |
| Billing | **Stripe** | Deferred; integration seam only (§7). |
| Analytics | **PostHog** (EU) | Understanding, never engagement-maxxing (§7). |
| Media / object storage | **Cloudflare R2** | Binaries live off the VPS (§6). |
| Infra | **Docker + Coolify + Hetzner** | Self-hosted orchestration (§6). |

---

## 3. The membrane at the server boundary

The most important architectural rule, and it is a *security* rule, not a styling one: a
non-member's browser must **never receive** the `apparatus` (`03 §7.7`, `05 §9`).

Next's **React Server Components** are the mechanism. Member-depth content is fetched and
rendered *server-side*, behind Payload's access control; for a public request the byte
never enters the client payload at all. This is categorically stronger than hiding a
`<div>` — there is nothing in the delivered HTML or the client bundle to reveal. Payload's
field-level read access (`apparatus` returns nothing to a non-member) is the enforcement;
RSC is the delivery boundary that honors it.

---

## 4. Two cache regimes

Permanence (`03 §7.1`) and the membrane split the app cleanly in two:

- **Public surface** — `thesis` only, stable slugs, no per-user state → **static / ISR,
  cacheable and fast.** A public Work is generated once and served from cache.
- **Member surface** — per-member, behind auth → **dynamic, uncached.**

The frozen code resolves as a **permanent (301) redirect** to the slug (`/I.FL.004` →
`/…slug…`), so a citation is a link that never dies. The public Meilisearch index is
cache-friendly; the member scope is authenticated (§7).

---

## 5. Rendering & routing

App Router. A public segment (the vitrine, the curated window `03 §4.1`, `thesis`-level
Work pages) rendered static/ISR; a member segment (the full Catalog, `apparatus`, the
archive) rendered dynamically behind auth. The code→slug redirect and a permanence-aware
sitemap live in routing. Draft preview uses Payload's server-side draft mode — never a
public URL.

---

## 6. Infrastructure topology

**Coolify on a Hetzner VPS**, orchestrating Docker containers: the Next.js/Payload app,
Postgres, and Meilisearch. **Cloudflare R2** holds media externally — binaries never sit on
the VPS.

**Backups are a requirement, not an afterthought.** Automated Postgres dumps, encrypted,
shipped off-site to R2 on a schedule. This is written into the architecture because of the
one honest risk of self-hosting: **self-hosted Postgres means you own uptime and backups.**
For Phase 0 a single capable VPS is right; the scale-out path (separate DB host, read
replicas) is noted but not built.

---

## 7. Services & their discipline

- **Resend** — the invitation, the threshold, the nomination outcome. This is the ceremony
  channel (`05 §3`); its emails carry the register of the House, not SaaS notifications.
- **Meilisearch** — two scopes, synced from Payload via hooks. The public index **never**
  holds `apparatus` or `NEVER`-mode Works (`03 §8`, `§7.7`). The membrane holds in the
  search box.
- **Stripe** — deferred (`03 §9`). The seam is defined now (a hook-ready
  `Member.stripeCustomerId`) so billing is an addition later, never a retrofit.
- **PostHog (EU)** — analytics for *understanding the product*, explicitly **not** for
  optimizing dwell time or engagement (`05 §9`). This constraint is architectural: the
  House measures to learn, never to trap.

EU data residency is deliberate throughout (PostHog EU, Hetzner EU).

---

## 8. Environments, secrets, migrations

Local dev via Docker Compose mirroring prod; production on Hetzner via Coolify. Secrets held
in Coolify / environment, never in the repo. **Migrations are single-path** — Payload's
migrations over the one Postgres — which is the direct payoff of §1: one system, one
migration story, one thing to reason about.

*(Open: whether a staging environment is worth its cost in Phase 0 — §11.)*

---

## 9. Security & data protection

Postgres is locked down: **only Payload writes the membership tables** — the discipline that
backs the application-layer enforcement of `03 §7`. Auth for Phase 0 is Payload's
email-based flow, matched to the invite path (`03 §5`, `DIRECT_INVITE`). Backups encrypted
(§6). No pure-white, no analytics-for-engagement — the constraints from `04`/`05` that touch
delivery are honored at this layer too.

---

## 10. The build gate & order

This document is the gate. Once ratified, the fixed order is:

1. Scaffold Next.js + Payload (this doc).
2. Model the Catalog + membership collections (`03 §10.1`).
3. Auth + the invite/threshold flow (`05 §3`, Resend).
4. Two-depth Work rendering — the membrane at the server boundary (§3).
5. Catalog navigation (Kingdom/Domain + Lens) and the public window.
6. Meilisearch, two scopes.
7. Precedence ritual + the code→slug permanent redirect.
8. *(Billing deferred; the seam only.)*

The detailed sequencing lives in `06-ROADMAP.md`.

---

## 11. Open questions — architecture-owned

1. **Staging environment** — worth the cost in Phase 0, or dev-and-prod only?
2. **Single VPS vs. separate DB host** — at what signal do we split Postgres onto its own
   machine?
3. **Meilisearch shape** — one filtered index vs. two physical indexes (impl detail,
   deferrable to the build).
4. **Backup cadence & retention** — the concrete numbers (frequency, retention window).
5. **Extraction trigger** — confirm the concrete signal (§1) that promotes Prisma / Better
   Auth from *deferred* to *now*.
