import type { CollectionConfig } from 'payload'

// Lens — a durable way of seeing that cuts across the taxonomy (docs/03-DATABASE.md §3.3).
// Discovery, NOT identity: multi-valued, unordered, mutable, metadata only. A Lens never
// touches a Work's code. The Work owns the relationship (Work.lenses); this side reads it
// back via a `join` so the pairing is stored in exactly one place.
//
// `memberSynthesis` is the reserved seam for a future standing "how I think" surface
// (§9.1) — present in the model, not yet surfaced in the product.
export const Lenses: CollectionConfig = {
  slug: 'lenses',
  admin: {
    group: 'Catalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Stable URL slug for the Lens.' },
    },
    { name: 'publicSynthesis', type: 'richText' },
    { name: 'memberSynthesis', type: 'richText' },
    {
      name: 'works',
      type: 'join',
      collection: 'works',
      on: 'lenses',
      admin: { description: 'Works carrying this Lens (read-only; set on the Work).' },
    },
  ],
}
