# DEPLOYMENT — Stage 0 runbook (Hetzner + Coolify)

A precise, founder-run runbook to take the Stage 0 skeleton live at
**`staging.titani.ca`**. Architecture: `02-ARCHITECTURE.md` (§6 infra, §8 secrets, §9
security). You run every step here; the agent takes no Coolify/DNS/secret access.

**Outcome:** `https://staging.titani.ca/` serves the Stage 0 skeleton (paper ground, ink
text, palette specimen); `https://staging.titani.ca/admin` serves the Payload panel.

Time: ~30–45 min. You need: a Hetzner account, control of the `titani.ca` DNS zone, and
a terminal.

---

## 0. Placeholders used below

Fill these in as you go; never commit real values.

| Placeholder | What it is | How to get it |
|---|---|---|
| `<VPS_IPV4>` | Public IPv4 of the Hetzner VPS | Hetzner console, after §1 |
| `<VPS_IPV6>` | Public IPv6 (optional) | Hetzner console |
| `<PAYLOAD_SECRET>` | Long random string, signs Payload sessions | `openssl rand -base64 32` |
| `<DATABASE_URI>` | Postgres DSN | From the Coolify Postgres resource (§5) |
| `<COOLIFY_URL>` | Your Coolify dashboard URL | After §4, e.g. `https://<VPS_IPV4>:8000` |

---

## 1. Provision the Hetzner VPS

1. Hetzner Cloud console → **Add Server**.
2. **Location:** an EU region (Nuremberg/Falkenstein/Helsinki) — EU residency is deliberate (`02 §7`).
3. **Image:** Ubuntu 24.04 LTS.
4. **Type:** shared vCPU, **CX22** (2 vCPU / 4 GB) is enough for Stage 0; CX32 for headroom.
5. Add your **SSH key**.
6. Create. Note `<VPS_IPV4>` (and `<VPS_IPV6>`).

Quick hardening (optional but recommended), SSH in as root:

```bash
ssh root@<VPS_IPV4>
apt update && apt -y upgrade
# ufw: allow SSH, HTTP, HTTPS, and the Coolify dashboard port
ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw allow 8000 && ufw --force enable
```

---

## 2. DNS — point staging.titani.ca at the VPS

In your DNS provider for `titani.ca` (e.g. Cloudflare), add:

| Type | Name | Value | Proxy / TTL |
|---|---|---|---|
| `A` | `staging` | `<VPS_IPV4>` | **DNS only** (grey cloud) / Auto |
| `AAAA` | `staging` | `<VPS_IPV6>` | **DNS only** (grey cloud) / Auto — optional |

> Keep it **DNS-only (unproxied)** for the first deploy so Coolify's Let's Encrypt HTTP-01
> challenge can reach the box. You can switch Cloudflare proxying on afterward (set SSL mode
> to *Full (strict)*).

Verify propagation before continuing:

```bash
dig +short staging.titani.ca    # should print <VPS_IPV4>
```

---

## 3. (Local parity) Install Docker on your Mac — optional, for local runs

Not required for the deploy, but needed to run the CMS locally (Postgres). Either:

- **Docker Desktop:** download the Apple-Silicon `.dmg` from docker.com, install, launch. Or
- **Colima (CLI-only):** `brew install colima docker docker-compose && colima start`

Then, from the repo root, local parity is:

```bash
cp apps/web/.env.example apps/web/.env     # set PAYLOAD_SECRET to `openssl rand -base64 32`
docker compose up -d db                    # Postgres on :5432
corepack pnpm --filter @titanica/web dev   # app on http://localhost:3000
```

---

## 4. Install Coolify on the VPS

Coolify's installer also installs Docker Engine on the server, so there is no separate
server-side Docker step.

```bash
ssh root@<VPS_IPV4>
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

When it finishes, open `<COOLIFY_URL>` (`http://<VPS_IPV4>:8000`), create the admin
account, and complete onboarding (it registers this server as the deploy target).

---

## 5. Create the Postgres resource

1. Coolify → your Project → **+ New Resource → Database → PostgreSQL** (version **16**).
2. Deploy it. Open the resource → copy its **internal connection string**
   (host is the internal service name, reachable by the app container). This is
   `<DATABASE_URI>`, shaped like:
   `postgres://<user>:<pass>@<internal-host>:5432/<db>`

> Payload creates its own tables on first boot — no manual schema step in Stage 0.

---

## 6. Create the Application (this repo)

1. Coolify → **+ New Resource → Application → Public/Private Git repository**.
2. Repository: `nicco-titanica/titanica`. Branch: `main`
   (or `stage-0-foundation` to deploy the PR before merge).
3. **Build Pack: Dockerfile.**
4. **Dockerfile Location:** `apps/web/Dockerfile`
5. **Base Directory / Build Context:** `/` (repo root — the Dockerfile is monorepo-aware and expects it).
6. **Port (exposed):** `3000`

---

## 7. Environment variables (Application → Environment)

Set these as placeholders → real values. **Never commit them.**

```
PAYLOAD_SECRET=<PAYLOAD_SECRET>                 # openssl rand -base64 32
DATABASE_URI=<DATABASE_URI>                     # from §5
NEXT_PUBLIC_SERVER_URL=https://staging.titani.ca
```

> `NEXT_PUBLIC_SERVER_URL` must match the final public URL exactly (used for links/emails).

---

## 8. Domain + TLS

1. Application → **Domains** → set `https://staging.titani.ca`.
2. Coolify requests a Let's Encrypt certificate automatically (needs §2 DNS-only + port 80 open).

---

## 9. Deploy

Click **Deploy**. Coolify builds `apps/web/Dockerfile` (standalone Next output) and starts
the container. Watch the build/deploy logs to completion.

Redeploys: push to the tracked branch (enable auto-deploy or trigger manually). Migrations
are single-path via Payload over the one Postgres (`02 §8`).

---

## 10. Verify (Definition of Done)

```bash
# 1) Skeleton is live and carries the palette:
curl -sS https://staging.titani.ca/ | grep -o '#F2EEE5\|#1C1A16\|#C02D1C\|A House of Intelligence'
#    expect: the three hex values + the standfirst

# 2) HTTP 200 + valid TLS:
curl -sS -o /dev/null -w "%{http_code}\n" https://staging.titani.ca/     # expect 200

# 3) Admin panel responds:
curl -sS -o /dev/null -w "%{http_code}\n" https://staging.titani.ca/admin # expect 200/307
```

Then open `https://staging.titani.ca/admin` in a browser and **create the first operator
user** (the Payload admin login — not a product Member).

Stage 0 DoD is met when (1)–(3) pass and the admin panel loads.

---

## 11. Backups (set up now, not later — `02 §6`)

Enable **scheduled Postgres backups** on the Coolify Postgres resource, shipped to
**Cloudflare R2** (S3-compatible). Cadence/retention are architecture-owned (`02 §11.4`) —
a daily dump with 14–30 day retention is a sane Stage 0 default. Confirm one restore works.

---

## 12. Hold at the gate

When the checks in §10 pass, **stop**. Stage 1 (the Catalog spine) begins only on the
founder's word (`06-ROADMAP.md`).
