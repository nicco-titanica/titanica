import type { CollectionConfig } from 'payload'

// Kingdom — the top taxonomy (docs/03-DATABASE.md §1, §3.1). Five of them, I–V.
// Seed data only in Stage 1; no authoring workflow beyond the fields the model needs.
export const Kingdoms: CollectionConfig = {
  slug: 'kingdoms',
  admin: {
    group: 'Catalog',
    useAsTitle: 'name',
    defaultColumns: ['roman', 'name', 'order'],
  },
  fields: [
    {
      name: 'roman',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Roman numeral I–V. Appears as the first segment of a Work code.' },
      validate: (value: unknown) =>
        ['I', 'II', 'III', 'IV', 'V'].includes(value as string)
          ? true
          : 'Kingdom numeral must be one of I, II, III, IV, V.',
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { description: 'Display order, 1–5.' },
    },
  ],
}
