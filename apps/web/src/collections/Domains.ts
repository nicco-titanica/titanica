import type { CollectionConfig } from 'payload'

// Domain — a subject within exactly one Kingdom (docs/03-DATABASE.md §1, §3.1).
// Twenty-five in all. The 2-letter `code` is GLOBALLY UNIQUE by design: it is the second
// segment of a Work code and must be self-validating — a code maps to exactly one Kingdom
// (§3.2). The unique constraint here is what enforces that.
export const Domains: CollectionConfig = {
  slug: 'domains',
  admin: {
    group: 'Catalog',
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'kingdom', 'order'],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 2,
      admin: {
        description: 'Two uppercase letters, globally unique (e.g. FL, IM). Part of the permanent Work code.',
      },
      validate: (value: unknown) =>
        /^[A-Z]{2}$/.test(value as string)
          ? true
          : 'Domain code must be exactly two uppercase letters (A–Z).',
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'kingdom',
      type: 'relationship',
      relationTo: 'kingdoms',
      required: true,
      admin: { description: 'The single Kingdom this Domain belongs to.' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { description: 'Display order within the Kingdom.' },
    },
  ],
}
