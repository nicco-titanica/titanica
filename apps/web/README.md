# @titanica/web

The Titanica web application — **Next.js (App Router, RSC) + Payload CMS v3**, one system
over one Postgres (`docs/02-ARCHITECTURE.md §1`).

## Layout

```
src/
├── payload.config.ts        Payload config (Stage 0: admin login only)
├── collections/Users.ts     CMS operator auth — NOT the product Member (Stage 3)
└── app/
    ├── (frontend)/          the public/member site (its own root layout)
    │   ├── layout.tsx        loads the two faces via next/font
    │   ├── styles.css        design tokens — transcribes docs/04-DESIGN.md §10
    │   └── page.tsx          Stage 0 skeleton: palette + type specimen
    └── (payload)/           Payload admin + API route group (generated boilerplate)
```

Two root layouts (one per route group) — deliberate: the site and the Payload admin are
separate roots, so there is no shared `app/layout.tsx`.

## Local development

Requires **Docker** (for Postgres) — see the repo-root `docker-compose.yml`.

```bash
cp apps/web/.env.example apps/web/.env      # then edit PAYLOAD_SECRET
docker compose up -d db                      # Postgres on :5432
pnpm --filter @titanica/web dev              # app on :3000
```

- `http://localhost:3000/` — the Stage 0 skeleton
- `http://localhost:3000/admin` — Payload admin (create the first operator user)

`pnpm` is provided via `corepack` (`corepack prepare pnpm@9.12.0 --activate`).

## Scripts

| Script | Does |
|---|---|
| `dev` | Next dev server |
| `build` | Production build (`output: standalone`) |
| `typecheck` | `tsc --noEmit` |
| `generate:types` | Payload → `src/payload-types.ts` |
| `generate:importmap` | Payload admin import map |

## Deployment

Production is Hetzner via Coolify — see [`../../docs/DEPLOYMENT.md`](../../docs/DEPLOYMENT.md).
