# 04 — DESIGN

Status: **PROPOSED (v0.1)** — governing document, awaiting founder ratification
Derives from: `00-CONSTITUTION.md` and the locked brand system
Pairs with: `05-UX.md` (behavior) — where the two meet, `04` owns the *means*, `05` owns
the *intent*
Unlocks: the design tokens the `apps/web` build consumes (§10)

> This document owns the **visual language**: color, type, the wordmark, the monogram,
> space, and rule. It does not own flow or behavior (`05`). Most of it is not a proposal
> but a transcription — the system is already locked; what is genuinely *proposed* here
> (a type scale, a size floor, sanctioned italic use, imagery) is marked as such in §11.
> Restraint is the signal. The House looks as though it predates the web: nothing
> decorative, everything structural. *Beauty increases attention* (Constitution) — earned
> by composition and space, never by ornament.

---

## 1. The principle

The visual language serves the institution, not the screen. Its most conspicuous feature
is a set of **absences** — no pure white, no gradients, no decorative shadow — and those
absences are the signature. Where the modern web reaches for flourish to hold attention,
Titanica withholds, and the withholding reads as authority. Every visual choice answers
one question: *does this make the House look more permanent, or less?*

---

## 2. The closed palette — three surfaces

The palette is **closed**. Three values, and no fourth is ever introduced:

| Token | Hex | Role |
|---|---|---|
| **ink** | `#1C1A16` | The darkest value. Text on paper; ground in ink mode. |
| **paper** | `#F2EEE5` | The lightest value. Ground on paper; text in ink mode. |
| **red** | `#C02D1C` | The single accent. Sparing, deliberate, never atmospheric. |

**There is no `#FFFFFF`.** Paper is the lightest surface that exists; pure white is
forbidden everywhere, including form fields, cards, and imagery mattes. This one rule does
more to distinguish the House than any positive choice.

**Two modes, one accent.**

- **Paper mode** — paper ground, ink text. The primary reading surface.
- **Ink mode** — ink ground, paper text. The grave, ceremonial surface (the threshold,
  §05 §3; exhibit blocks).
- **Red** is the constant in both, used as a *single mark of consequence* — never as a
  field, never as a mood.

**Contrast is engineered, not assumed** (WCAG):

- ink ↔ paper ≈ **15:1** — AAA both directions; the reading contract is generous.
- red on paper ≈ **5:1** — clears AA for text, but reserved for accent/display for
  editorial reasons, never sustained reading.
- red on ink ≈ **3:1** — **large/display only**; red body text on ink is forbidden (it
  fails AA at text sizes).

**Hierarchy without shadow.** Elevation is carried by three means only: the **surface
swap** (an ink block set into a paper page), the **hairline rule** (§7), and **space**.
Never by shadow, blur, glow, or gradient.

---

## 3. The two typefaces

Two faces, and no third is ever loaded.

**Bodoni Moda — the display serif.** A didone: high stroke contrast, hairline serifs. It
is the institutional voice. Weight **500**, optical sizing (`opsz`) engaged so large sizes
sharpen and don't thin to nothing. **Display sizes only** — the hairlines vanish at small
sizes, so Bodoni below the size floor (§4) is forbidden. It sets headlines, the hero
thesis line, epigraphs — the places the House *speaks*. **Bodoni italic 500 is permitted for
a single purpose: to lift one important word inside a headline** (founder-ratified) — never
for running text, never more than a word or two per headline.

**Libre Franklin — the only sans, all text.** Body, UI, labels, captions, navigation,
metadata — everything that is not display. **Never italic**: emphasis is carried by weight
or by the red accent, never by slant. This is a hard rule and the reason Franklin's italics
are never used even though the webfont ships them.

The division is absolute: **Bodoni speaks, Franklin informs.** Nothing set in Bodoni is
meant to be read in paragraphs; nothing set in Franklin is meant to carry institutional
voice.

---

## 4. Type scale & optical rules (proposed — §11)

A restrained modular scale (≈ 1.25). Bodoni occupies the top tiers; Franklin the rest.

| Tier | Face | Size (proposed) |
|---|---|---|
| Display / hero | Bodoni Moda 500 | 3.8–5.2rem, optical |
| H1 | Bodoni Moda 500 | 2.6rem |
| H2 | Bodoni Moda 500 | 1.9rem |
| **Bodoni size floor** | — | **1.5rem — below this, Franklin only** |
| Lead / standfirst | Libre Franklin 300 | 1.35rem |
| Body | Libre Franklin 400 | 1.0625rem |
| Label / UI | Libre Franklin 500–600 | 0.875rem |
| Caption / meta | Libre Franklin 400 | 0.8125rem |

Reading is governed too: a **measure of ~62–72ch** for body, body **line-height ~1.6**.
These are the concrete means `05 §5` (depth, not dwell) relies on. Numbers are proposed
and tunable; the *rules* (Bodoni floor, Franklin-never-italic, the measure) are not.

---

## 5. The wordmark

The wordmark "Titanica" is **always the PNG asset** — `wordmark-ink.png` /
`wordmark-paper.png` — and **never set as live text.** The reason is exactness: the mark is
a specific Bodoni rendering with fixed kerning, and shipping it as an image removes
font-load flash and any per-browser drift. The wordmark is a *seal*, not a headline.
Rules: use the variant that reads on the ground (ink wordmark on paper, paper wordmark on
ink); preserve clear space (≥ the cap-height on all sides); respect a minimum legible
size; **never** recolor, restretch, add effects, or reconstruct it in live type.

---

## 6. The monogram — the arrow →

The forward-pointing arrow is the House's **silent signature mark** — the monogram. It
signs; it does not shout. Its native place is where a signature would fall: the close of a
Work, a corner, the terminal mark of a sequence. Single weight, drawn in ink, paper, or
red per surface. It is never a decorative motif sprayed across a page, never dressed as a
generic "next/click" affordance, never animated for flourish. When the House puts its mark
on something, it uses the arrow — once, quietly. (Sanctioned placements to be confirmed —
§11.)

---

## 7. Space, rule, and structure

With shadow and gradient forbidden, structure is carried by three instruments:

- **Space.** The institution is not crowded. Generous, consistent spacing on a scale
  (proposed base 8px; ramp 8·12·16·24·32·48·64·96). Emptiness is composure, not waste.
- **The hairline rule.** A single thin line — 1px, in ink or (rarely) red — is the only
  divider and frame. It separates, encloses, and dignifies without weight.
- **The surface swap.** Grouping and emphasis are done by moving a block onto the other
  surface (an ink card on a paper page), not by lifting it with shadow.

---

## 8. Motion

Motion is functional, never decorative. State transitions and the two ceremonial moments
`05` defines — the **threshold** (`05 §3`) and the **precedence reveal** (`05 §4`) — are
where motion is permitted to carry weight, and even there it is slow and slight. Forbidden:
parallax, scroll-jacking, autoplay, attention-grabbing entrance animation. Motion is the
*means* of `05`'s rituals; it does not exist for its own sake.

---

## 9. What the visual language must never do

- No `#FFFFFF`, anywhere. Paper is the lightest value.
- No gradients. No decorative shadow, blur, or glow.
- No third face; nothing outside Bodoni Moda + Libre Franklin.
- No italic Franklin. No Bodoni below the size floor. (Bodoni italic is allowed only to
  lift one word in a headline — §3.)
- No wordmark as live text; no recolored, distorted, or reconstructed wordmark or
  monogram.
- **Imagery is disciplined, not decorative.** Two registers: the **exhibit plate**
  (documentary, hairline-framed — the register in use now) and **photography** (arriving
  soon). Both are held to the House: toned to the palette, never pure white, framed by
  hairline, never atmospheric, never stock, no gradient overlays or shadows on the image.
  Photography enters as *evidence and subject*, not as mood.

---

## 10. Tokens — the bridge to the build

The language is the source of truth the frontend consumes, as design tokens (CSS custom
properties in the `apps/web` build):

```
--ink: #1C1A16;  --paper: #F2EEE5;  --red: #C02D1C;   /* closed set */
--font-display: "Bodoni Moda";       /* 500, opsz */
--font-text:    "Libre Franklin";    /* never italic */
--measure: 66ch;  --rule: 1px;
/* type scale + space scale per §4, §7 */
```

`04` owns the *values*; the build owns the *implementation*. The frontend-design work
reads these tokens — it does not re-decide them.

---

## 11. Open questions

Resolved (founder): **Bodoni italic** lifts one word inside a headline, nothing else (§3);
**imagery** runs in two disciplined registers — exhibit plate now, photography soon (§9).

Still open:

1. **The type-scale numbers and the Bodoni size floor** (§4) — proposed defaults stand;
   the founder tunes exact values in the browser.
2. **Monogram placements** (§6) — confirm the sanctioned uses of the arrow.
