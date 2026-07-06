# DEPLOYMENT — Hetzner via Coolify

Operational runbook for the Stage 0 skeleton and every stage after. The architecture is
`02-ARCHITECTURE.md` (§6 infrastructure, §8 environments/secrets, §9 security). This file
is the *how*.

> Stage 0's Definition of Done includes a **live, empty skeleton on a subdomain** (e.g.
> `staging.titani.ca`) carrying the palette and type. Everything below the app image
> (server, Coolify, DNS, secrets) needs the founder's infrastructure and cannot be done
> from the repo alone — the checklist marks exactly what only the founder can supply.

---

## Topology (recap of `02 §6`)

- **Hetzner VPS** running **Coolify**, orchestrating Docker containers.
- Containers: the **Next.js/Payload app** (built from `apps/web/Dockerfile`) and **Postgres**.
- **Cloudflare R2** holds media off the VPS (not exercised in Stage 0).
- **Backups**: automated, encrypted Postgres dumps shipped to R2 (set up alongside the DB).

---

## What only the founder can provide (blockers for the live deploy)

1. **A Hetzner VPS** (EU region) with **Coolify** installed and reachable.
2. **DNS** for `titani.ca` (Cloudflare) — an A/AAAA record for `staging.titani.ca` → the VPS.
3. **Secrets**, set in Coolify (never in the repo):
   - `PAYLOAD_SECRET` — `openssl rand -base64 32`
   - `DATABASE_URI` — from the Coolify-managed Postgres
   - `NEXT_PUBLIC_SERVER_URL` — `https://staging.titani.ca`
4. Confirmation of the **staging subdomain** name (the roadmap suggests `staging.titani.ca`).

Give me these (or run the steps below yourself) and the skeleton goes live.

---

## First-time setup on Coolify

1. **Provision Postgres** in Coolify (managed Postgres resource, v16). Note its internal
   connection string → this becomes `DATABASE_URI`.
2. **Create an Application** from this Git repository:
   - Build pack: **Dockerfile**
   - Dockerfile location: `apps/web/Dockerfile`
   - Build context / base directory: **repo root** (the Dockerfile expects it).
   - Exposed port: **3000**
3. **Set environment variables** (from the secrets list above).
4. **Domain**: set `staging.titani.ca`; let Coolify provision TLS (Let's Encrypt).
5. **Deploy.** Coolify builds the image and starts the container.
6. **Backups**: enable scheduled Postgres backups to Cloudflare R2 (cadence/retention are
   architecture-owned, `02 §11.4`).

## Ongoing deploys

Push to the tracked branch (or trigger in Coolify); it rebuilds from `apps/web/Dockerfile`.
Migrations are single-path via Payload over the one Postgres (`02 §8`).

---

## Verifying a deploy

- `https://staging.titani.ca/` → the Stage 0 skeleton (paper ground, ink text, the specimen).
- `https://staging.titani.ca/admin` → the Payload admin panel (create the first operator user).

---

## Local parity

The repo-root `docker-compose.yml` mirrors this: Postgres for dev, and a `full` profile that
runs the very same production image locally. Local dev needs **Docker installed** on the
machine (Docker Desktop or an equivalent engine) — it is not currently present in this
workspace, so local boot is pending that install (or a reachable external `DATABASE_URI`).
