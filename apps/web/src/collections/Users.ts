import type { CollectionConfig } from 'payload'

// Stage 0 scaffold only.
//
// This is the CMS operator login — the account that reaches the Payload admin panel —
// NOT the product's Member model. The Member (auth-enabled, cohort, admission path,
// nomination allowance) is defined in docs/03-DATABASE.md §5 and built in Stage 3.
// Payload requires at least one auth collection for the admin panel to boot; this is it,
// and nothing more. Do not add product fields here.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}
