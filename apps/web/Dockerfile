# syntax=docker/dockerfile:1
#
# Production image for @titanica/web (Next.js + Payload v3), for Coolify → Hetzner.
# BUILD CONTEXT IS THE REPO ROOT (this is a pnpm monorepo):
#   docker build -f apps/web/Dockerfile -t titanica-web .
# Next.js `output: 'standalone'` with outputFileTracingRoot at the repo root produces a
# self-contained bundle at apps/web/.next/standalone.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

# ---- deps: install workspace dependencies from the lockfile ----
FROM base AS deps
WORKDIR /repo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN pnpm install --frozen-lockfile

# ---- builder: compile the standalone app ----
FROM base AS builder
WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /repo/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# The public (thesis-only) build does not need a live DB. A placeholder secret lets
# Payload's config validate at build time; the real secret is injected at runtime.
ENV PAYLOAD_SECRET=build-time-placeholder
RUN pnpm --filter @titanica/web build

# ---- runner: minimal runtime ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
