// Verify the taxonomy data is well-formed WITHOUT a database or the Payload runtime.
// Run:  pnpm --filter @titanica/web verify:taxonomy
// Payload-free on purpose, so it works on any Node and proves the seed's guard.
import { DOMAINS, KINGDOMS, taxonomyBlockers } from './taxonomy'

const blockers = taxonomyBlockers()

console.log(`Kingdoms: ${KINGDOMS.length}/5   Domains: ${DOMAINS.length}/25`)
const withCode = DOMAINS.filter((d) => /^[A-Z]{2}$/.test(d.code) && d.code !== '??').length
console.log(`Domains with a resolved code: ${withCode}/${DOMAINS.length}`)

if (blockers.length === 0) {
  console.log('\n✓ Taxonomy is ready to seed.\n')
  process.exit(0)
}

console.log(`\n✗ ${blockers.length} blocker(s) — seed will refuse:\n`)
for (const b of blockers) console.log(`  · ${b}`)
console.log('')
process.exit(1)
