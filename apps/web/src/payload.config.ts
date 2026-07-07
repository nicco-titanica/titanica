import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Domains } from './collections/Domains'
import { Kingdoms } from './collections/Kingdoms'
import { Lenses } from './collections/Lenses'
import { Users } from './collections/Users'
import { Works } from './collections/Works'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// One system: Payload owns content + membership + auth over one Postgres
// (docs/02-ARCHITECTURE.md §1).
//
// Stage 1 — the Catalog spine: Kingdom, Domain, Work, Lens (docs/03-DATABASE.md §10.1),
// with the frozen-code system and the visibility invariants. Membership (Member,
// Nomination) is Stage 3 and is NOT modelled yet. `Users` remains the CMS operator login.
export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Kingdoms, Domains, Works, Lenses, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
