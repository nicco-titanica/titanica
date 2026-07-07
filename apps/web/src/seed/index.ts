// Idempotent seed of the Catalog taxonomy — the 5 Kingdoms and 25 Domains only.
// NO Works (Stage 1 rule). Run with:  pnpm --filter @titanica/web seed
// (uses `payload run`, which handles env + config; needs Node 20/22 LTS and a live DB).
//
// The taxonomy guard runs FIRST and imports no Payload code, so an unready taxonomy is
// reported without any database or runtime — the House does not seed invented data.
import { DOMAINS, KINGDOMS, taxonomyBlockers } from './taxonomy'

const seed = async (): Promise<void> => {
  const blockers = taxonomyBlockers()
  if (blockers.length > 0) {
    console.error('\n✗ Seed refused — the taxonomy is not ready:\n')
    for (const b of blockers) console.error(`  · ${b}`)
    console.error('\nSupply the founder-ratified 2-letter Domain codes in src/seed/taxonomy.ts, then re-run.\n')
    process.exit(1)
  }

  // Payload is imported only once the taxonomy is proven ready.
  const { getPayload } = await import('payload')
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  // Kingdoms — upsert by roman.
  const kingdomIdByRoman = new Map<string, number | string>()
  for (const k of KINGDOMS) {
    const found = await payload.find({ collection: 'kingdoms', where: { roman: { equals: k.roman } }, limit: 1 })
    const doc = found.docs[0] ?? (await payload.create({ collection: 'kingdoms', data: k }))
    kingdomIdByRoman.set(k.roman, doc.id)
    console.log(`  Kingdom ${k.roman} — ${k.name}`)
  }

  // Domains — upsert by code.
  for (const d of DOMAINS) {
    const kingdom = kingdomIdByRoman.get(d.kingdomRoman)
    if (!kingdom) throw new Error(`Domain "${d.name}" references unknown Kingdom ${d.kingdomRoman}.`)
    const found = await payload.find({ collection: 'domains', where: { code: { equals: d.code } }, limit: 1 })
    if (found.docs.length === 0) {
      await payload.create({
        collection: 'domains',
        data: { code: d.code, name: d.name, kingdom, order: d.order },
      })
    }
    console.log(`  Domain ${d.code} — ${d.name} (${d.kingdomRoman})`)
  }

  console.log(`\n✓ Seed complete: ${KINGDOMS.length} Kingdoms, ${DOMAINS.length} Domains.\n`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
