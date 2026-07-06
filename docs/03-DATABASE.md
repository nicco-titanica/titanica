# 03 — DATABASE

Status: **PROPOSED (v0.3)** — governing document, awaiting founder ratification
Derives from: `01-PRODUCT.md` (§4, §8), `00-CONSTITUTION.md`, and the ratified Catalog
taxonomy (5 Kingdoms · 25 Domains, per `titani.ca/catalog`)
Unlocks: `05-UX.md`, the `apps/web` content + membership build
Runs on: **Payload CMS** over one Postgres — the single-system decision ratified in
`02-ARCHITECTURE.md §1`. Prisma / Better Auth are a documented *extraction path* (§2), not
a v1 dependency.

> v0.3 supersedes v0.2: it adopts the single-system architecture (Payload owns content
> *and* membership *and* auth for v1). The logical model (§3–§8) is unchanged; only the
> physical ownership (§2, §5, §10) changes.
> v0.2 corrected the taxonomy (Kingdom / Domain), collapsed Serie into **Lens**, made
> **Work** format-bearing, and fixed the code model (§3.2).
> A database doc for a permanent House is a doc about **invariants**, not tables. The
> hard rules live in §7 and are the real deliverable. Two of them — the frozen code and
> the immutable slug — are what let a citation survive a decade.

---

## 1. The logical model, stated tool-agnostically

Seven concepts carry the House.

- **Catalog** — the whole permanent body. A singleton invariant, not a table: nothing
  rotates *out* of it.
- **Kingdom** — the top taxonomy, five of them, numbered I–V (The Forces · The Systems ·
  The Knowledge · The Culture · The Individual). Carries a Roman numeral.
- **Domain** — a subject within a Kingdom; twenty-five in all. Carries a 2-letter code.
- **Work** — the atomic unit of the Catalog. Format-bearing (Dispatch, Essay, Dossier,
  Atlas, Timeline, …). Two depths, one visibility model, one frozen code.
- **Lens** — a durable way of seeing that cuts across the taxonomy. Multi-valued,
  unordered, mutable, **metadata only** — never part of a Work's identity. Absorbs the
  former "Framework" and the former "Series" (Manifest, Interregnum, Introitus are now
  Lenses).
- **Member** — the House profile *and* the identity: an auth-enabled record carrying
  cohort, admission path, and nomination rights. In v1 there is no separate User — Member
  is the login (Better Auth deferred, §2).
- **Nomination** — a *candidacy*, never an admission.

Containment is strict: a Domain belongs to exactly one Kingdom; a Work belongs to
exactly one Domain. A Work may carry many Lenses. **Only the containment path is
permanent identity; the Lens is discovery, not identity.**

---

## 2. Who owns the data — RATIFIED: one system (Payload)

For v1, **Payload CMS owns everything** — content *and* membership *and* auth — over a
single Postgres. This is *the less the better*: a solo founder with AI keeps one system he
can actually maintain, and operational surface he cannot maintain is itself a threat to
permanence (the Decision Rule, applied to infrastructure). The complex membership logic
(billing, the status economy of nomination) does not exist in Phase 0, so standing up a
second data layer for it now is premature.

| Concern | v1 owner | Mechanism |
|---|---|---|
| Kingdom, Domain, Work, Lens, media (→ R2) | Payload | Content collections (§10.1). |
| Member, Nomination, cohort, allowance | Payload | Collections + access control + hooks (§10.1). |
| Identity / login / session | Payload | The **Member** collection is auth-enabled — it *is* the login. |
| The membrane (`thesis` vs `apparatus`) | Payload | **Field-level access control** — the reason one system suffices (§4, §7). |

**The extraction path (deferred, not discarded).** Prisma and Better Auth remain the
*target* the day membership earns them — real billing, passkeys/OAuth, or an auth surface
decoupled from the CMS. Because Payload runs on Postgres, that day is a *contained
extraction* over the same database (lift Member/Nomination into Prisma; move identity to
Better Auth), not a rewrite. `02-ARCHITECTURE.md §1` holds the trigger conditions.

> Honest cost of one system: invariants (§7) are enforced in Payload's access control and
> hooks, **not** as database-level relational constraints. The mitigation is discipline —
> only Payload writes these tables; direct Postgres access is closed. Acceptable for
> Phase 0; the extraction path restores hard constraints when the stakes rise.

---

## 3. The Catalog structure

### 3.1 Kingdom → Domain → Work

Five Kingdoms (I–V). Twenty-five Domains, each in exactly one Kingdom. Every Work sits in
exactly one Domain. This one-directional containment is what makes the code (§3.2)
deterministic and self-validating.

### 3.2 The code — minted once, frozen forever

A Work's code is its permanent citation and archival identity. It derives **only** from
the permanent containment path, never from anything mutable.

```
{Kingdom roman} . {Domain code} . {ordinal}
       I        .      FL        .   004        4th Work in Fault Lines (Kingdom I)
       I        .      IM        .   001        1st Work in Imperium
```

- **Kingdom** — Roman numeral I–V.
- **Domain** — 2-letter code (FL, IM, …).
- **ordinal** — the Work's position **within its Domain**, zero-padded to 3 digits,
  assigned as `MAX(ordinal in Domain) + 1` at first member-release.

**Self-validating.** The Kingdom is derivable from the Domain (a Domain lives in one
Kingdom), so the leading numeral is redundant *by design*: `II.FL.004` is malformed
because FL belongs to Kingdom I. The code checks itself.

**Minted once, frozen forever.** The code is minted at the moment a Work is first
released to members (`memberReleaseAt`). At that instant its parts are snapshotted onto
dedicated frozen fields — `codeKingdom`, `codeDomain`, `codeOrdinal` — **decoupled from
the live Kingdom/Domain relations.** Thereafter the Work may be re-Lensed, re-formatted,
or even re-domiciled to a different Domain in the display; **the code never moves.** It
is an accession number, an archival fact, not a live pointer. This is the mechanism
behind invariant §7.1.

**Lens is never in the code.** Because a Work carries many Lenses and Lenses are mutable,
no Lens can touch identity. The old third segment (MNF / INT / INTR) is gone; those names
survive as Lenses (§3.3), freed from the code. The ordinal's "single ordered home,"
previously the Series, is now the **Domain** — single and permanent.

**Two immutable identities.** The **code** (`I.FL.004`) is citation/archival identity;
the **slug** is the URL/address (§7.1). Both are frozen at first release. Recommended:
the code resolves as a permanent redirect (`/I.FL.004` → slug), so a citation is a link
that never dies.

**Re-mint note (one-time, pre-launch).** The three live codes (`I.FL.MNF.04`,
`I.IM.INT.06`, `I.FL.INTR.01`) re-mint into the new form, ordered by date within Domain.
This is the only moment the scheme may change; permanence is a promise that begins now.

### 3.3 Lens — the cross-dimensional layer

The Constitution names the House's purpose as organizing knowledge into *durable mental
frameworks*; Lens is that layer, and also the surface where the member's relationship to
"how I think" can later attach (§9.1 stub). A Lens carries a title, a stable slug, a
public synthesis, and a member-depth synthesis, and relates to Works **many-to-many**.
Lens is **discovery, not identity**: multi-valued, unordered, and mutable. Ordering a
Work "within a Lens" (e.g. "the 4th Manifest") is a *view* — query the Lens, order by
date — never a fact stored in the code. What is *not* built in v1: any authoring workflow
for how a Lens is composed over time (founder-owned, §11).

### 3.4 Work format

`format: enum { DISPATCH, ESSAY, DOSSIER, ATLAS, TIMELINE }` — single-valued, extensible.
**All five are active from day one** (founder-ratified). Format is **metadata, not
identity**: it describes the shape of a Work, not its place in the Catalog, and therefore
never appears in the code. A Work's format may change (an Essay expanded into a Dossier)
without touching its code or slug.

---

## 4. The Work entity — two depths, one visibility model

**Two depths.** The same Work holds a public face and a member face:

- `thesis` — the public depth. The shop window that proves taste.
- `apparatus` — the member depth. The full argument, sources, scoped claims, reasoning.

A member sees `thesis + apparatus`; the public sees `thesis` alone.

> **§9.1 — resolved (founder).** "How I think" lives **inside `apparatus`** in v1 — the
> reasoning is embedded Work by Work, which *is* the method. A standing method surface
> (`Lens.memberSynthesis`) remains the seam for later, when there is enough method to earn
> its own room; it is not built now.

**One visibility model.** Precedence, the public window, and member-only Works all fall
out of one mechanism:

- `memberReleaseAt: DateTime?` — when members may see the Work (and when the code is
  minted, §3.2). Null ⇒ draft to everyone.
- `publicMode: enum { NEVER, SCHEDULED }` — is this Work ever meant for the public?
  `NEVER` = **member-only forever** (e.g. Dossiers).
- `publicReleaseAt: DateTime?` — when the public may see the `thesis`. Required when
  `SCHEDULED`; must be null when `NEVER`.

From this one mechanism: **precedence** = `publicReleaseAt > memberReleaseAt` (the gap is
the ritual, §11); **the public window** = a curation over publicly-released Works (§4.1);
**member-only Works** = `publicMode = NEVER`, no new structure. `NEVER` is *not* a paid
super-tier — every member (Founding and paying alike) sees it. It is the reward of being
inside, not of paying (cohort governs payment, not content — §5). "Access Level" in any UI
is the *readable outcome* of this model, not a field that replaces it.

### 4.1 The public rotating window

The public sees a rotating few; the member sees all. Rotation is a **curation layer**
(an ordered selection among publicly-released Works), not a property of Work. For a
member, totality means simply "all Works where `now ≥ memberReleaseAt`," archive
included.

---

## 5. Membership — the Member (identity + profile in one)

**Member** is an auth-enabled Payload collection: it is both the login and the House
profile (no separate User in v1 — §2).

  - `cohort: enum { FOUNDING, STANDARD }` — **set by admission ordinal, not by path**:
    the first `FOUNDING_CAP = 50` admitted (across all doors, by `admittedAt`) are
    FOUNDING and unpaid; #51+ are STANDARD and paying (§2, `01 §2`). An admission hook
    assigns it: `COUNT(members) < 50 → FOUNDING, else STANDARD`. Cohort governs **payment,
    not content** — both see the whole Catalog.
  - `admissionPath: enum { DIRECT_INVITE, NOMINATION, APPLICATION }` — independent of cohort.
  - `admittedAt: DateTime` — the induction moment (onboarding as ceremony, §05); also the
    tiebreaker that fixes the ordinal.
  - `nominationAllowance: Int` — scarce right of nomination (e.g. 2/year).
  - `stripeCustomerId: String?` — **stub until member #51** (§9); FOUNDING never carries one.

---

## 6. Nomination — a candidacy, never an admission

- `nominatedBy` → Member.
- `candidate` — free-standing data (name, context, the nominator's case). **Not a User** —
  a nomination must never imply an account, let alone entry.
- `status: enum { PENDING, ADMITTED, DECLINED }` — House-controlled transitions.
- `createdAt`, `decidedAt`.

There is deliberately **no** path by which creating a Nomination creates a Member (§7.4).

---

## 7. Invariants — the hard rules

1. **Permanent identity never moves.** A Work's **slug** (URL) and **frozen code**
   (§3.2) are set once, at first release, and are immutable thereafter — even if the
   Work's live Domain, format, or Lenses change. The address and the citation are
   promises of permanence.
2. **Members always precede the public.** When `publicMode = SCHEDULED`,
   `publicReleaseAt ≥ memberReleaseAt` is enforced. No Work reaches the public before a
   member could have seen it.
3. **`NEVER` means never.** `publicMode = NEVER ⇒ publicReleaseAt IS NULL`. A member-only
   Work has no public path — structurally absent, not merely unscheduled.
4. **A nomination cannot admit.** No automated path turns `Nomination.create` into
   `Member.create`. Admission is a distinct House act against a `PENDING` nomination.
5. **The allowance floor is zero.** `nominationAllowance` decrements on nomination
   *creation*, guarded `≥ 0`. **No refund on decline** (founder-ratified) — the friction is
   the product.
6. **The Founding cap is hard.** `FOUNDING_CAP = 50`. The first 50 admitted (by
   `admittedAt`) are FOUNDING and unpaid; #51+ are STANDARD. When billing is live (from
   #51), STANDARD requires an active subscription to retain access; FOUNDING never does.
   Cohort gates payment, never content.
7. **The membrane never leaks through search (§8).** No member-depth field (`apparatus`,
   member syntheses, `NEVER`-mode Works) is reachable by an unauthenticated query.

**Enforcement (v1).** These invariants live in Payload's access control and collection
hooks: field-level read access for the membrane (1, 7); `beforeChange` hooks for the frozen
code and the precedence / `NEVER` rules (1–3); hooks guarding the nomination rules (4, 5).
They are application-layer guarantees, not DB constraints, until the extraction path (§2)
restores relational enforcement.

---

## 8. Search (Meilisearch) — scoped, or it leaks

- **Public scope** — only `thesis`-level fields of Works where `now ≥ publicReleaseAt`
  and `publicMode = SCHEDULED`. Never `apparatus`, never `NEVER`-mode Works.
- **Member scope** — the full corpus a live member is entitled to.

One index with an authenticated filter or two physical indexes is an implementation
choice; the invariant (§7.7) is not.

---

## 9. Billing — the count trigger (member #51)

Monetization enters at a count, not a date: the **51st admitted member pays** (`01 §7`).
The seed — the first 50 — is unpaid. v1 carries `Member.stripeCustomerId?` as the seam;
it goes live when seat #51 is offered, at which point a Stripe webhook maintains a
subscription-status field and a hook gates STANDARD access (§7.6).

**Turning billing on does *not* trigger the Prisma extraction (§2).** A single flat tier
lives comfortably inside Payload (webhook + status field + access hook). Extraction waits
for genuine billing complexity — multiple tiers, proration, dunning, or the nomination
status economy touching billing — owned by a future `MONETIZATION.md`.

---

## 10. Proposed schemas

### 10.1 Payload collections (spec, not full config) — the whole v1

```
Kingdom  { roman(I–V), name, order }
Domain   { code(2), name, kingdom→Kingdom, order }
Work {
  title, slug (immutable-after-release),
  domain→Domain,                         // live categorization
  format (select: DISPATCH|ESSAY|DOSSIER|ATLAS|TIMELINE),   // all five active v1
  thesis (richText),                     // public depth
  apparatus (richText),                  // member depth — holds "how I think" (§9.1)
  lenses →→ Lens,                        // many-to-many, NOT in the code
  // frozen code — snapshotted at first member-release, never edited:
  codeKingdom (text), codeDomain (text), codeOrdinal (number),
  memberReleaseAt (date?),
  publicMode (select: NEVER|SCHEDULED),  // NEVER = member-only (e.g. Dossier)
  publicReleaseAt (date?),               // required iff SCHEDULED; null iff NEVER
  featuredInWindow (bool), windowOrder (number?)   // public curation §4.1
}
Lens {
  title, slug, publicSynthesis (richText), memberSynthesis (richText),
  works →→ Work
}
Member {                                 // auth-enabled — this IS the login
  email (auth),
  cohort (select: FOUNDING|STANDARD),    // set by admission hook: <50 → FOUNDING, else STANDARD
  admissionPath (select: DIRECT_INVITE|NOMINATION|APPLICATION),
  admittedAt (date),                     // fixes the ordinal → cohort
  nominationAllowance (number, default 2),
  stripeCustomerId (text?)               // live from member #51 (§9)
}
Nomination {
  nominatedBy →Member, candidateName (text), candidateContext (textarea),
  status (select: PENDING|ADMITTED|DECLINED), decidedAt (date?)
  // hooks: decrement nominator allowance on create (guard ≥0);
  //        NO hook creates a Member — admission is a separate House act (§7.4)
}
```

The displayed code = `${codeKingdom}.${codeDomain}.${String(codeOrdinal).padStart(3,'0')}`,
computed from the *frozen* fields, never from the live `domain` relation.

### 10.2 The extraction target (deferred — NOT built in v1)

When membership earns Prisma (§2), the Payload collections above lift into these models
over the *same* Postgres. Kept here so the future is designed, not improvised:

```prisma
enum Cohort           { FOUNDING STANDARD }
enum AdmissionPath    { DIRECT_INVITE NOMINATION APPLICATION }
enum NominationStatus { PENDING ADMITTED DECLINED }

model Member {
  id                  String   @id @default(cuid())
  cohort              Cohort
  admissionPath       AdmissionPath
  admittedAt          DateTime
  nominationAllowance Int      @default(2)
  stripeCustomerId    String?
  nominationsMade     Nomination[] @relation("nominator")
  createdAt           DateTime @default(now())
}

model Nomination {
  id               String   @id @default(cuid())
  nominatedById    String
  nominatedBy      Member   @relation("nominator", fields: [nominatedById], references: [id])
  candidateName    String
  candidateContext String                        // the case; NOT a User
  status           NominationStatus @default(PENDING)
  createdAt        DateTime @default(now())
  decidedAt        DateTime?
}
```

At extraction, the no-relation-from-`Nomination`-to-`Member` shape (§7.4) becomes a
DB-enforced guarantee instead of a hook.

---

## 11. Open questions — founder-owned

Resolved: the leading `I` is the Kingdom numeral; the Serie/Lens ambiguity is abolished
(Lens only); the code model is fixed (§3.2); ownership is closed (one system, Payload, §2);
**formats — all five active from day one (§3.4); member-only Works (`NEVER`) ship in v1 as
Dossiers (§4); "how I think" stays in `apparatus` (§4); nomination declines are not refunded
(§7.5); cohort is ordinal with `FOUNDING_CAP = 50` and #51 pays (§5, §9).**

Still open — one, and it is dormant at launch:

1. **The precedence gap (§4)** — how long members precede the public, uniform or per
   Lens/Domain. **Not in play in v1**: at launch, Dispatches are public and Dossiers are
   `NEVER` (member-only), so no Work goes member-*first-then-public*. A dormant default
   (uniform, 72h) is set and revisited when the first member-first release actually occurs.
