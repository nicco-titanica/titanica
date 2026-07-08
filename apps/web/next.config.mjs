import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output so the production Docker image (Coolify → Hetzner) is self-contained.
  output: 'standalone',
  // Monorepo: trace files from the repo root, two levels up from apps/web.
  outputFileTracingRoot: path.join(dirname, '../../'),
}

export default withPayload(nextConfig)
