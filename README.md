# pipery.dev

This app can now be exported as a static site and published to a `release`
branch for GitHub Pages.

## How it works

- The Next.js app uses `output: 'export'` and builds static files into `out/`.
- The GitHub Actions workflow at
  `.github/workflows/release-static-page.yml` runs on pushes to `main` and on
  manual dispatch.
- Each deployment is published to `release/releases/<git-sha>/`, so previously
  released pages remain intact.
- The root of the `release` branch keeps a small redirect page that forwards
  GitHub Pages traffic to the latest versioned release, plus `.nojekyll`.
- During the build, `RELEASE_VERSION` is added to the Next.js `basePath`, which
  makes the exported assets resolve correctly from their versioned URL.

## GitHub Pages setup

In your repository settings, configure GitHub Pages to deploy from:

- Branch: `release`
- Folder: `/ (root)`

For project Pages sites, the build automatically uses the repository name as
the base path during GitHub Actions runs. For `<user>.github.io` repositories,
it deploys from the root path instead.
