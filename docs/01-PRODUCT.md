# 01 — PRODUCT

Status: **APPROVED (v1.0)** — governing document
Derives from: `00-CONSTITUTION.md`
Unlocks: `03-DATABASE.md`, `05-UX.md`, and the `apps/web` build

> This document answers one question and one only: **what is Titanica selling, and
> what does a member actually hold?** Everything downstream — the data model, the
> access surfaces, the pages, the onboarding — is plumbing around the answer given
> here. Where this document decides, it is binding. Where it defers, the open
> question is named explicitly in §9 and belongs to the founder.

---

## 1. What the member buys

Titanica does not sell content. Information is now free, and an AI will hand it to
anyone for nothing. **Titanica sells belonging and standing** — the fact of having
been *chosen*, membership in a class of minds, a validated patent of taste and
intelligence. This is what makes the model immune to the deflation AI imposes on
information: AI can give away knowledge, it cannot confer status.

The reference points are Aspen fellowships, Raya, Soho House — not a magazine.

But belonging must rest on something, or the target reader — solvent, and expert at
sniffing out counterfeit status — sees the emptiness immediately. That "something"
is the Catalog. Hence the single governing relationship of this whole document:

> **The Catalog is the collateral that makes the patent real.
> Belonging is what is paid for.**

The Catalog is not the product. It is the proof that this is a room of real minds and
not a vanity club. Without the Catalog, the membership is a Soho House with no ideas.
With it, belonging has ground to stand on. This ordering resolves the apparent
tension between "we sell belonging" and "the Catalog is the heart": both are true,
in this sequence, and neither survives without the other.

**The Decision Rule still governs.** *Does this strengthen Titanica as a permanent
House of Intelligence?* If no, we do not build it. Scarcity is the product; any
choice that dilutes exclusivity is forbidden even when it grows the numbers.

---

## 2. Two populations, never confused

The word "member" hides two different things. Conflating them is the most expensive
mistake available to us, so the document separates them by name.

**The Founding cohort (the first 50).** Hand-picked, courted, **unpaid**. They do
not buy the patent — *they are the collateral that makes it real.* Their composition
is the only genuine asset Titanica owns in its first months. The value every later
member pays for is borrowed from who is already inside. Getting these people right,
and refusing everyone else, is the entire job of Phase 0. Composition is everything.
The cohort is **ordinal, not by channel**: the first 50 admitted — invitations and
validated applications counted together — are Founding and free; **the 51st member pays.**
A slow invitee can arrive as #51 and pay; an early applicant can be #12 and never pay.
Position in the House sets the cohort, not the door one came through. `FOUNDING_CAP = 50`
is a hard constant, not "~50."

**Paying members (from #51).** They buy the patent the Founding cohort made real.
Monetization reaches them, never the seed. The trigger is a **count, not a calendar**:
the 51st admitted member. Crucially, **cohort governs payment, not content** — Founding
and paying members see the same Catalog; only the invoice differs.

Everything in §3–§4 describes what *any* member holds. Everything in §5 describes how
the two populations are admitted in sequence.

---

## 3. What the member finds on day one

The honest constraint: on the first day the *peer circle is empty by definition.*
Fifty strangers who do not yet speak of Titanica are not a community; calling them one
produces a silent, embarrassing room that kills the patent faster than its absence
would. So the day-one deliverables are built only from what **already exists** on the
day a member walks in. Three things do:

**(a) The Catalog, in the member's relationship to it.** The public sees the shop
window — the thesis, the proof of taste. The member holds a *different relationship to
the same body of work*: the full apparatus, the whole Catalog, and it first. This is
the center; §4 specifies it precisely.

**(b) The mind behind the House — "how I think," made accessible.** In public,
Titanica speaks as an authorless institution; there is no visible byline. For the
member, the asymmetry inverts: the member is given access to the reasoning behind the
Works — how a thesis is built, how sources are weighed, how claims are scoped, how a
judgment is reached. This is the moat. It cannot be cloned, it is AI-immune, and it is
the *cheapest* thing to deliver when members number fifty. The public gets the
institution; the member gets the mind inside it.

**(c) The frame of having been chosen.** Entry is an **induction into an institution**,
not a signup. A member is named, crosses a threshold, and is marked — the Founding
designation is itself part of the collateral. This is where "fake it until you make it"
is legitimate: the packaging, the voice, the bearing of an already-established
institution are real from day zero. The membrane — *who is actually inside* — is never
faked.

**Deferred, and deliberately so:**

- **The peer circle** is a *promise seeded toward*, not a day-one deliverable. It is
  cultivated in Phase 1–2. Diagnostic: if members do not speak of Titanica
  spontaneously, the "inside" is empty — a signal to read, not a feature to fake.
- **Bespoke / made-to-measure intelligence** is an obligation a solo founder cannot
  honor at scale on day one. It is sequenced as a high tier (see §4 and §9), not a
  launch feature.

---

## 4. The access model

There are two content-states for every Work in the Catalog, separated by the
membership gate. The distinction between them is defined on three axes. **These three
axes are binding** and are the direct input to `03-DATABASE.md`.

**Depth.** The public holds the *thesis*. The member holds the *complete apparatus* —
the full argument, the sources, the scoped claims, the reasoning. Same Work, two
depths.

**Totality.** The public sees a *rotating few* Works — the window, curated. The member
holds *the entire Catalog plus the archive.* Nothing rotates out of a member's reach.

**Precedence.** The member sees a Work *before* it reaches the public. Precedence is
run as a **ritual**, not merely a head start: the member's prior access is a marked
moment, part of what belonging feels like.

Base tier = **Depth + Totality.** Precedence = the **ritual layer** over it.

**The high tier (deferred — do not build yet).** A *different object*: intelligence
that reaches members and is **never** released publicly. Crucially, this needs no new
structure. In the data model it is simply a Work whose public-state is `never`. The
tier is a **policy on top of one flexible visibility model**, not a second system.
`03-DATABASE.md` must therefore model visibility as a first-class property of a Work
(`member-first date`, `public date`, `public: never`) so that the high tier, the
ritual of precedence, and the public window all fall out of the *same* mechanism.
Building three systems where one visibility field suffices would violate
*Clarity > simplicity is clarified, never simplified.*

---

## 5. Entry — the channels, in sequence (not in parallel)

The doors open in time order. They are phases, not options offered simultaneously.

**Phase 0 — Seeding (month 1–2).** Direct, hand-delivered invitation only.
Applications **closed.** The public door is deliberately opaque. Goal: the right
composition, not a headcount. The Founding cohort is admitted here, unpaid.

**Phase 1 — Taking root (month 2–4).** Informal, *un-incentivized* word of mouth. No
mechanism yet. This phase is also the diagnostic in §3: spontaneous talk means the
inside is real; silence means it is not, and no growth mechanism should be switched on
until it is.

**Phase 2 — Controlled nomination (month 4–8).** Referral as a *scarce right of
nomination* (e.g. 2 nominations per member per year). The member **nominates**, and does
not admit — the filter stays with the House. Reward to the nominator is **internal
status**, never a discount. Monetization may begin here, once the patent has value.

**Phase 3 — Public application (month 6+).** Application as the public door: *"One does
not enter. One is chosen."* Rejection is only credible now, because the room is already
full of the right people.

---

## 6. Referral / nomination — the rules

Three hard constraints, each protecting the product from its own growth:

- **Never reward volume.** Volume turns members into salespeople and dilates the House.
  Reward bringing the *right* person, paid in status-currency.
- **Never let a nomination guarantee entry.** The friction *is* the product; removing it
  removes what is being sold. A nomination is a candidacy the House still filters.
- **Reward the nominator in internal standing, never in money or discounts.** Status is
  the only currency that does not cheapen the House by circulating.

---

## 7. Monetization

Monetization enters **at a count, not a calendar date.** The Founding cohort — the first
50 — is unpaid by design; they are the collateral, not the revenue. Paid access begins
precisely at the **51st admitted member** (§2). This sharpens *seed first, charge later*
into a rule that cannot drift: the seed **is** the first 50, and charging begins the
moment the 51st seat is offered. Price structure is deferred to its own document; the
ordering and the trigger are fixed here.

One scheduling consequence follows and is carried into `06-ROADMAP`: the billing seam must
be **ready before the 50th seat fills**, since #51 pays on arrival. Monetization is
deferrable — but only until the cohort is nearly full, not indefinitely.

---

## 8. What this document unlocks

For `03-DATABASE.md` (derive next):

- **Work** as the atomic unit of the Catalog, carrying two depths (public thesis /
  member apparatus) and a first-class **visibility model** (`member-first date`,
  `public date`, `public: never`) — the single mechanism behind precedence, the public
  window, and the high tier.
- **Framework / Catalog** — the compounding structure that Works belong to (the
  permanent body; stable URLs; nothing rotates out of a member's reach).
- **Member** — carrying `cohort` (founding vs. paying), admission path, and nomination
  rights (a scarce, countable allowance).
- **Nomination** as its own entity: nominator, candidate, status — a candidacy, not an
  admission.

For `05-UX.md`:

- Onboarding is an **induction ritual**, not a signup flow (§3c).
- Precedence is surfaced as a **marked moment**, not a silent early-access flag (§4).
- The public surface proves taste with a curated, rotating window; the member surface
  gives depth, totality, and the mind behind the Works (§3, §4).
- Reward depth, not dwell time (per Constitution).

For `apps/web`: do not scaffold until `02-ARCHITECTURE.md` confirms the stack against
the visibility/permanence requirements above (stable URLs, durable content model,
member-vs-public rendering of the *same* Work).

---

## 9. Open questions — founder-owned, not to be invented

These are named deliberately so no downstream doc quietly decides them:

1. **The concrete shape of "how I think" (§3b).** *What* is the member actually shown
   of the reasoning — annotated apparatus inside each Work? a standing method surface?
   a periodic note in the founder's voice? The principle is fixed; the surface is not.
2. **The precedence ritual (§4).** By how long does the member precede the public, and
   what marks the moment so it reads as ceremony rather than a mere head start?
3. **The high tier's first object (§4).** *What* is the never-public intelligence — and
   is it introduced at all in v1, or only stubbed in the data model and left dormant?
4. **Price structure and timing (§7).** Deferred to its own document; the ordering
   (seed first) is the only thing fixed here.

Until these are nailed, downstream docs stub them against the model in §8 and do **not**
fill them in.
