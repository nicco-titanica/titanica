import type { CollectionBeforeChangeHook, CollectionConfig, FieldHook } from 'payload'

import { slugify } from '../utilities/slugify'

// Work — the atomic unit of the Catalog (docs/03-DATABASE.md §3.4, §4).
// Stage 1 builds the model, the frozen-code system (§3.2), and the visibility invariants
// (§4, §7). NO rendering, NO membrane enforcement, NO Works are authored here — that is
// Stage 2+. The two depths (`thesis` / `apparatus`) exist as fields; nothing reads them yet.

// --- Frozen code: minted once at first member-release, then never edited (§3.2, §7.1). ---
const mintFrozenCode: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const alreadyMinted = originalDoc?.codeOrdinal !== undefined && originalDoc?.codeOrdinal !== null

  if (alreadyMinted) {
    // Frozen forever: restore the identity fields regardless of any incoming edit, and
    // hold the slug immutable-after-release. The live `domain` may still change (display),
    // but the code and address never move.
    data.codeKingdom = originalDoc.codeKingdom
    data.codeDomain = originalDoc.codeDomain
    data.codeOrdinal = originalDoc.codeOrdinal
    if (originalDoc.slug) data.slug = originalDoc.slug
    return data
  }

  // Not yet minted. The code is minted at the moment a Work is first released to members.
  if (!data.memberReleaseAt) return data

  const domainRel = data.domain as unknown
  const domainId =
    domainRel && typeof domainRel === 'object' ? (domainRel as { id: number | string }).id : domainRel
  if (!domainId) {
    throw new Error('Titanica: a Work must have a Domain before it is released to members.')
  }

  const domain = await req.payload.findByID({ collection: 'domains', id: domainId as number | string, depth: 1 })
  const domainCode = (domain as { code?: string }).code
  const kingdomRel = (domain as { kingdom?: unknown }).kingdom
  const roman =
    kingdomRel && typeof kingdomRel === 'object'
      ? (kingdomRel as { roman?: string }).roman
      : (await req.payload.findByID({ collection: 'kingdoms', id: kingdomRel as number | string }))?.roman

  if (!domainCode || !roman) {
    throw new Error('Titanica: could not resolve the Domain code / Kingdom numeral to mint the code.')
  }

  // ordinal = MAX(ordinal in Domain) + 1, over Works already minted in this Domain (§3.2).
  const last = await req.payload.find({
    collection: 'works',
    where: { codeDomain: { equals: domainCode } },
    sort: '-codeOrdinal',
    limit: 1,
    depth: 0,
  })
  const maxOrdinal = (last.docs[0] as { codeOrdinal?: number } | undefined)?.codeOrdinal ?? 0

  data.codeKingdom = roman
  data.codeDomain = domainCode
  data.codeOrdinal = maxOrdinal + 1

  // Freeze the slug at release: derive from the title if the author left it empty.
  if (!data.slug && typeof data.title === 'string') data.slug = slugify(data.title)

  return data
}

// --- Displayed code, computed from the FROZEN fields, never the live domain (§10.1). ---
const computeDisplayedCode: FieldHook = ({ data }) => {
  const ordinal = data?.codeOrdinal
  if (ordinal === undefined || ordinal === null) return undefined
  return `${data?.codeKingdom}.${data?.codeDomain}.${String(ordinal).padStart(3, '0')}`
}

// --- Visibility invariants (§4, §7.2, §7.3), enforced inline at the field. ---
const validatePublicReleaseAt = (
  value: unknown,
  { siblingData }: { siblingData: Partial<{ publicMode: string; memberReleaseAt: string }> },
): true | string => {
  const mode = siblingData?.publicMode
  if (mode === 'NEVER' && value) {
    return 'NEVER means never (§7.3): a member-only Work must have no public release date.'
  }
  if (mode === 'SCHEDULED' && !value) {
    return 'SCHEDULED requires a public release date (§4).'
  }
  if (mode === 'SCHEDULED' && value && siblingData?.memberReleaseAt) {
    if (new Date(value as string) < new Date(siblingData.memberReleaseAt)) {
      return 'Members must precede the public (§7.2): public release must be on or after member release.'
    }
  }
  return true
}

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    group: 'Catalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'code', 'domain', 'format', 'publicMode'],
  },
  hooks: {
    beforeChange: [mintFrozenCode],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'domain',
      type: 'relationship',
      relationTo: 'domains',
      required: true,
      admin: { description: 'Live categorization. The frozen code is snapshotted from this at first release.' },
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      options: [
        { label: 'Dispatch', value: 'DISPATCH' },
        { label: 'Essay', value: 'ESSAY' },
        { label: 'Dossier', value: 'DOSSIER' },
        { label: 'Atlas', value: 'ATLAS' },
        { label: 'Timeline', value: 'TIMELINE' },
      ],
      admin: { description: 'All five active from day one (§3.4). Metadata, not identity — never in the code.' },
    },
    // The two depths (§4). Present as fields; nothing renders them until Stage 2.
    { name: 'thesis', type: 'richText', admin: { description: 'Public depth — the shop window.' } },
    { name: 'apparatus', type: 'richText', admin: { description: 'Member depth — full argument, sources, reasoning ("how I think", §9.1).' } },
    {
      name: 'lenses',
      type: 'relationship',
      relationTo: 'lenses',
      hasMany: true,
      admin: { description: 'Cross-dimensional Lenses. Many-to-many, mutable — NEVER part of the code.' },
    },

    // ---- Sidebar: permanent identity + visibility ----
    {
      name: 'code',
      type: 'text',
      virtual: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Frozen citation code (Kingdom.Domain.ordinal). Minted at first member-release.',
      },
      hooks: { afterRead: [computeDisplayedCode] },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Permanent URL slug. Auto-derived from title at release if left empty; immutable after release (§7.1).',
      },
    },
    {
      name: 'memberReleaseAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'When members may see the Work — and when the code is minted (§3.2). Empty ⇒ draft to everyone.',
      },
    },
    {
      name: 'publicMode',
      type: 'select',
      required: true,
      defaultValue: 'SCHEDULED',
      options: [
        { label: 'Scheduled — public at a date', value: 'SCHEDULED' },
        { label: 'Never — member-only forever', value: 'NEVER' },
      ],
      admin: { position: 'sidebar', description: 'NEVER = member-only (e.g. a Dossier).' },
    },
    {
      name: 'publicReleaseAt',
      type: 'date',
      validate: validatePublicReleaseAt,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        condition: (data) => data?.publicMode === 'SCHEDULED',
        description: 'When the public may see the thesis. Required iff SCHEDULED; must be empty iff NEVER (§7.2, §7.3).',
      },
    },
    {
      name: 'featuredInWindow',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Curation for the public rotating window (§4.1).' },
    },
    {
      name: 'windowOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.featuredInWindow),
        description: 'Order within the public window.',
      },
    },

    // ---- Frozen code parts — system-owned, read-only, never hand-edited (§3.2) ----
    {
      type: 'collapsible',
      label: 'Frozen code (system)',
      admin: {
        position: 'sidebar',
        initCollapsed: true,
        description: 'Snapshotted at first release. Decoupled from the live Kingdom/Domain — do not edit.',
      },
      fields: [
        { name: 'codeKingdom', type: 'text', admin: { readOnly: true } },
        { name: 'codeDomain', type: 'text', admin: { readOnly: true } },
        { name: 'codeOrdinal', type: 'number', admin: { readOnly: true } },
      ],
    },
  ],
}
