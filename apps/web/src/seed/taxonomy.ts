// The ratified Catalog taxonomy — 5 Kingdoms · 25 Domains (docs/03-DATABASE.md §3.1).
//
// STATUS: names + Kingdom mapping are taken from titani.ca/catalog. The 2-letter DOMAIN
// CODES are NOT published there and are founder-owned editorial data. Only FL (Fault Lines)
// and IM (Imperium) are confirmed from 03 §3.2. The rest are the placeholder `??` and MUST
// be supplied by the founder before seeding — the seed script refuses to run while any
// placeholder remains (see ./index.ts). Codes are not invented here on purpose.

export const CODE_PLACEHOLDER = '??'

export type KingdomSeed = { roman: string; name: string; order: number }
export type DomainSeed = { code: string; name: string; kingdomRoman: string; order: number }

export const KINGDOMS: KingdomSeed[] = [
  { roman: 'I', name: 'The Forces', order: 1 },
  { roman: 'II', name: 'The Systems', order: 2 },
  { roman: 'III', name: 'The Knowledge', order: 3 },
  { roman: 'IV', name: 'The Culture', order: 4 },
  { roman: 'V', name: 'The Individual', order: 5 },
]

// order is within-Kingdom. Fill each `code` (two uppercase letters, globally unique).
export const DOMAINS: DomainSeed[] = [
  // I · The Forces
  { code: 'FL', name: 'Fault Lines', kingdomRoman: 'I', order: 1 }, // confirmed (03 §3.2)
  { code: CODE_PLACEHOLDER, name: 'The Reserve', kingdomRoman: 'I', order: 2 },
  { code: CODE_PLACEHOLDER, name: 'The Subsurface', kingdomRoman: 'I', order: 3 },
  { code: CODE_PLACEHOLDER, name: 'Terra', kingdomRoman: 'I', order: 4 },
  { code: CODE_PLACEHOLDER, name: 'Strategos', kingdomRoman: 'I', order: 5 },
  { code: 'IM', name: 'Imperium', kingdomRoman: 'I', order: 6 }, // confirmed (03 §3.2)
  { code: CODE_PLACEHOLDER, name: 'Fides', kingdomRoman: 'I', order: 7 },
  { code: CODE_PLACEHOLDER, name: 'Infra', kingdomRoman: 'I', order: 8 },
  // II · The Systems
  { code: CODE_PLACEHOLDER, name: 'Dry Powder', kingdomRoman: 'II', order: 1 },
  { code: CODE_PLACEHOLDER, name: 'The Firm', kingdomRoman: 'II', order: 2 },
  { code: CODE_PLACEHOLDER, name: 'Inference', kingdomRoman: 'II', order: 3 },
  { code: CODE_PLACEHOLDER, name: 'The Frontier', kingdomRoman: 'II', order: 4 },
  // III · The Knowledge
  { code: CODE_PLACEHOLDER, name: 'Eidos', kingdomRoman: 'III', order: 1 },
  { code: CODE_PLACEHOLDER, name: 'Strata', kingdomRoman: 'III', order: 2 },
  { code: CODE_PLACEHOLDER, name: 'Babel', kingdomRoman: 'III', order: 3 },
  { code: CODE_PLACEHOLDER, name: 'Foucault', kingdomRoman: 'III', order: 4 },
  // IV · The Culture
  { code: CODE_PLACEHOLDER, name: 'Vitruvio', kingdomRoman: 'IV', order: 1 },
  { code: CODE_PLACEHOLDER, name: 'Veblen', kingdomRoman: 'IV', order: 2 },
  { code: CODE_PLACEHOLDER, name: 'Terroir', kingdomRoman: 'IV', order: 3 },
  { code: CODE_PLACEHOLDER, name: 'Zeitgeist', kingdomRoman: 'IV', order: 4 },
  { code: CODE_PLACEHOLDER, name: 'The Arena', kingdomRoman: 'IV', order: 5 },
  // V · The Individual
  { code: CODE_PLACEHOLDER, name: 'Paideia', kingdomRoman: 'V', order: 1 },
  { code: CODE_PLACEHOLDER, name: 'Lectio', kingdomRoman: 'V', order: 2 },
  { code: CODE_PLACEHOLDER, name: 'Faber', kingdomRoman: 'V', order: 3 },
  { code: CODE_PLACEHOLDER, name: 'Diaspora', kingdomRoman: 'V', order: 4 },
]

// Guard: unresolved or non-conforming (non 2-uppercase-letter) or duplicate codes.
export const taxonomyBlockers = (): string[] => {
  const problems: string[] = []
  const seen = new Map<string, string>()
  for (const d of DOMAINS) {
    if (d.code === CODE_PLACEHOLDER) {
      problems.push(`"${d.name}" (${d.kingdomRoman}) has no code yet.`)
      continue
    }
    if (!/^[A-Z]{2}$/.test(d.code)) {
      problems.push(`"${d.name}" code "${d.code}" is not two uppercase letters.`)
      continue
    }
    if (seen.has(d.code)) {
      problems.push(`Code "${d.code}" is used by both "${seen.get(d.code)}" and "${d.name}" — codes must be globally unique.`)
    }
    seen.set(d.code, d.name)
  }
  if (DOMAINS.length !== 25) problems.push(`Expected 25 Domains, found ${DOMAINS.length}.`)
  if (KINGDOMS.length !== 5) problems.push(`Expected 5 Kingdoms, found ${KINGDOMS.length}.`)
  return problems
}
