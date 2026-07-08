// Seed the Catalog taxonomy — the 5 Kingdoms and 25 Domains only (NO Works, Stage 1 rule).
//
//   pnpm --filter @titanica/web seed
//
// Talks to the running server's REST API and imports ONLY the taxonomy (never `payload`),
// so it is immune to the Node/tsx loader issues that break `payload run` and a direct
// `tsx` import of Payload on Node 24. Idempotent: safe to run repeatedly.
//
// Prerequisites:
//   1. the app is running            (SEED_URL, default http://localhost:3000)
//   2. an operator user exists       (create the first user once at <SEED_URL>/admin)
//   3. credentials via env           (SEED_EMAIL, SEED_PASSWORD)
//
// The taxonomy guard runs first and refuses if any Domain code is unresolved/duplicated.
import { DOMAINS, KINGDOMS, taxonomyBlockers } from './taxonomy'

const BASE = (process.env.SEED_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const email = process.env.SEED_EMAIL
const password = process.env.SEED_PASSWORD

const die = (msg: string): never => {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}

const seed = async (): Promise<void> => {
  const blockers = taxonomyBlockers()
  if (blockers.length > 0) {
    console.error('\n✗ Seed refused — the taxonomy is not ready:\n')
    for (const b of blockers) console.error(`  · ${b}`)
    process.exit(1)
  }
  if (!email || !password) {
    die('Set SEED_EMAIL and SEED_PASSWORD to an operator account (created once at /admin).')
  }

  const api = `${BASE}/api`
  const authHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  })

  // Log in.
  const loginRes = await fetch(`${api}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).catch(() => die(`Could not reach ${BASE}. Is the app running?`))
  if (!loginRes.ok) die(`Login failed (HTTP ${loginRes.status}). Check SEED_EMAIL / SEED_PASSWORD.`)
  const token: string = (await loginRes.json()).token

  const findOne = async (collection: string, field: string, value: string) => {
    const res = await fetch(
      `${api}/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1&depth=0`,
      { headers: authHeaders(token) },
    )
    return (await res.json()).docs?.[0]
  }
  const create = async (collection: string, data: Record<string, unknown>) => {
    const res = await fetch(`${api}/${collection}`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(data),
    })
    if (!res.ok) die(`Create ${collection} failed (HTTP ${res.status}): ${JSON.stringify(await res.json())}`)
    return (await res.json()).doc
  }

  // Kingdoms — upsert by roman.
  const kingdomIdByRoman = new Map<string, number | string>()
  let kNew = 0
  for (const k of KINGDOMS) {
    const existing = await findOne('kingdoms', 'roman', k.roman)
    const doc = existing ?? ((kNew++), await create('kingdoms', k))
    kingdomIdByRoman.set(k.roman, doc.id)
  }

  // Domains — upsert by code.
  let dNew = 0
  for (const d of DOMAINS) {
    const kingdom = kingdomIdByRoman.get(d.kingdomRoman)
    if (!kingdom) die(`Domain "${d.name}" references unknown Kingdom ${d.kingdomRoman}.`)
    const existing = await findOne('domains', 'code', d.code)
    if (!existing) {
      dNew++
      await create('domains', { code: d.code, name: d.name, kingdom, order: d.order })
    }
    console.log(`  ${d.code}  ${d.name} (${d.kingdomRoman})`)
  }

  console.log(
    `\n✓ Seed complete: ${KINGDOMS.length} Kingdoms (${kNew} new), ${DOMAINS.length} Domains (${dNew} new).\n`,
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
