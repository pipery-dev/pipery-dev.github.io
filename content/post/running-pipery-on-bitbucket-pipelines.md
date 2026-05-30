---
title: "Running Pipery on Bitbucket Pipelines"
date: 2026-05-15
draft: false
description: "Adopt Pipery on Bitbucket Pipelines with shared pipeline imports, repository variables, artifacts, and dashboard links."
keywords:
  - Pipery Bitbucket
  - Bitbucket Pipelines
  - reusable Bitbucket pipelines
  - pipery.jsonl
  - Bitbucket CI/CD
---

Bitbucket Pipelines is now a first-class Pipery target. Pipery repositories in the `pipery-dev` Bitbucket workspace, such as `https://bitbucket.org/pipery-dev/npm-ci/` or `https://bitbucket.org/pipery-dev/cloudrun-cd/`, can expose shared pipeline definitions. Application repositories can import those definitions instead of copying the whole pipeline YAML into every repo.

The important difference is that Bitbucket sharing is import-based. You define import sources under `definitions.imports`, then use `import: pipeline-name@import-source-name` under any supported start condition, including `branches`, `pull-requests`, `tags`, and `custom`.

## Import a shared pipeline

In your application repository, point an import source at the Pipery Bitbucket repository that exports the pipeline. If the exported pipeline lives in that repository's `bitbucket-pipelines.yml`, the import source uses the Pipery repo slug and branch or tag:

```yaml
definitions:
  imports:
    pipery-npm-ci: pipery-dev/npm-ci:v1.1.0

pipelines:
  branches:
    main:
      import: pipery-npm-ci@pipery-npm-ci

  custom:
    run-pipery-npm-ci:
      import: pipery-npm-ci@pipery-npm-ci
```

If the exported pipeline lives in another file, include the file path in the import source:

```yaml
definitions:
  imports:
    pipery-cloudrun-cd: pipery-dev/cloudrun-cd:v1.1.0:.bitbucket/shared-pipelines.yml

pipelines:
  custom:
    deploy-cloudrun:
      import: pipery-cloudrun-cd@pipery-cloudrun-cd
```

## Import source formats

Bitbucket import sources can use three formats:

- `{config-filepath}` for imports within the same repository
- `{project-path}/{repo-slug}:{branch-or-tag}` for imports from another repository's `bitbucket-pipelines.yml`, such as `pipery-dev/npm-ci:v1.1.0`
- `{project-path}/{repo-slug}:{branch-or-tag}:{config-filepath}` for imports from another file in another repository, such as `pipery-dev/cloudrun-cd:v1.1.0:.bitbucket/shared-pipelines.yml`

An import statement always uses:

```text
{pipeline-name}@{import-source-name}
```

For external repositories, Bitbucket imports the HEAD commit of the targeted branch. Use a tag instead of a branch when you want application repositories pinned to a specific exported pipeline revision. Pipeline names are matched exactly; glob pattern matching is not supported for import statements.

## Configure repository variables

Set secrets in **Repository settings > Pipelines > Repository variables** and mark sensitive values as secured.

Common variables include:

- `PROJECT_PATH` for monorepos or nested applications
- `LOG_FILE` when you want a custom `pipery.jsonl` location
- `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` for image pushes
- `NPM_TOKEN`, `PYPI_TOKEN`, or language-specific registry tokens
- `GCP_SA_KEY`, `KUBECONFIG`, `SSH_KEY`, or `ARGOCD_TOKEN` for deployments

Keep non-secret defaults in YAML, but put credentials and environment-specific values in Bitbucket variables.

## Use Pipery skip flags

Bitbucket templates keep the same skip controls as the other providers. Set these as repository variables unless your adopted template explicitly maps them elsewhere:

```text
SKIP_SAST=false
SKIP_SCA=false
SKIP_LINT=false
SKIP_BUILD=false
SKIP_TEST=false
SKIP_RELEASE=true
```

That lets you start with validation only, then turn on publishing or deployment when the repository is ready.

## Preserve artifacts and dashboard links

Pipery templates publish `pipery.jsonl` as a Bitbucket artifact. Several templates also generate a dashboard link from Bitbucket build metadata such as `BITBUCKET_REPO_FULL_NAME`, `BITBUCKET_BUILD_NUMBER`, `BITBUCKET_BRANCH`, and `BITBUCKET_COMMIT`.

That gives reviewers a stable path from a Bitbucket build to the structured Pipery run log.

## Adoption checklist

1. Choose the shared Pipery pipeline repository and exported pipeline name.
2. Add a `definitions.imports` source for the repository, branch or tag, and optional config file path.
3. Reference the pipeline with `import: pipeline-name@import-source-name`.
4. Add secured repository variables for credentials.
5. Start with validation imports and keep release or deploy imports manual at first.
6. Confirm `pipery.jsonl` appears in artifacts.
7. Open the generated dashboard link after the first successful run.

Start with the Bitbucket mirror workspace: [bitbucket.org/pipery-dev](https://bitbucket.org/pipery-dev).
