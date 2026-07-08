# Titanica

**A House of Intelligence.**

Titanica is a permanent institution dedicated to organizing knowledge into durable
mental frameworks that help people understand the forces shaping the world. It is not
a publication, a media company, or a subscription — it is an institution whose heart is
**the Catalog**, a compounding body of knowledge.

Read [`docs/00-CONSTITUTION.md`](docs/00-CONSTITUTION.md) first. It governs everything here.

## Repository

This is a monorepo (pnpm + Turborepo).

```
docs/          Canonical specification — the source of truth
apps/web       The Titanica web application
packages/ui    Shared UI component library
```

## Getting started

```bash
pnpm install
pnpm dev
```

## The Decision Rule

Every decision in this repository answers one question:

> **Does this strengthen Titanica as a permanent House of Intelligence?**
> If the answer is no, we do not build it.
