import type { NextConfig } from 'next'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserOrOrgSite = repository.endsWith('.github.io')
const isGitHubActionsBuild = process.env.GITHUB_ACTIONS === 'true' && repository
const releaseVersion = process.env.RELEASE_VERSION?.trim()
const versionedSubPath = releaseVersion ? `/releases/${releaseVersion}` : ''

const basePath = isGitHubActionsBuild
  ? `${isUserOrOrgSite ? '' : `/${repository}`}${versionedSubPath}`
  : ''

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
}

export default nextConfig
