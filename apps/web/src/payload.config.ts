import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Stage 0 — Foundation.
// The single system (Payload owns content + membership + auth over one Postgres) is
// ratified in docs/02-ARCHITECTURE.md §1. The Catalog + membership collections
// (Kingdom, Domain, Work, Lens, Member, Nomination — docs/03-DATABASE.md §10.1) are
// modelled in Stage 1, NOT here. Stage 0 ships only the admin operator login so the
// panel can boot.
export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users],
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
