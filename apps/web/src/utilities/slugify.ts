// Minimal, dependency-free slugify for deriving a Work's URL slug from its title at
// first release (docs/03-DATABASE.md §3.2). Kept deterministic and boring on purpose —
// the slug is permanent (§7.1), so its derivation must never drift.
export const slugify = (input: string): string =>
  input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
