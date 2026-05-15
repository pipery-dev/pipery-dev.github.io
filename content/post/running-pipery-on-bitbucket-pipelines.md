---
title: "Running Pipery on Bitbucket Pipelines"
date: 2026-05-15
draft: false
description: "Adopt Pipery on Bitbucket Pipelines with mirrored repositories, repository variables, sequential steps, artifacts, and dashboard links."
keywords:
  - Pipery Bitbucket
  - Bitbucket Pipelines
  - reusable Bitbucket pipelines
  - pipery.jsonl
  - Bitbucket CI/CD
---

Bitbucket Pipelines is now a first-class Pipery target. Pipery repositories include `bitbucket-pipelines.yml` equivalents, and the mirror repositories on Bitbucket make it easier to review or copy those templates from the same provider your team uses for source control.

The important difference is that Bitbucket does not work like GitHub Actions or GitLab stages. Pipery maps the standard pipeline flow into Bitbucket steps, artifacts, secured repository variables, and optional manual release or deploy steps.

## Start from a mirrored template

In the Pipery Bitbucket workspace, open the pipeline family you want and review its `bitbucket-pipelines.yml` alongside the `src/` step scripts it calls.

The current Bitbucket templates are script-backed. If you copy a template into an application repository, make sure the matching Pipery step scripts are available at the paths used by the YAML, or adapt those paths before committing. A copied YAML file that still calls `bash ./src/step-build.sh` will fail if the application repository does not also contain that `src/` directory.

For an npm project, the provider-native flow is:

```yaml
pipelines:
  default:
    - step:
        name: Setup npm Environment
        script:
          - cd ${PROJECT_PATH:-.}
          - npm ci

    - step:
        name: Run Pipery build and test steps
        script:
          - bash ./path-to-pipery-scripts/step-build.sh
          - bash ./path-to-pipery-scripts/step-test.sh
        artifacts:
          - pipery.jsonl
```

Use the full Pipery template for production projects. It includes the standard security, lint, build, test, version, package, release, reintegration, log collection, and dashboard-link steps for the selected pipeline.

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

1. Choose the matching mirror repository in the Pipery Bitbucket workspace.
2. Review `bitbucket-pipelines.yml` and the `src/` scripts it references together.
3. Copy or adapt the template so those script paths exist in your application repository.
4. Add secured repository variables for credentials.
5. Start with validation steps and keep release or deploy manual at first.
6. Confirm `pipery.jsonl` appears in artifacts.
7. Open the generated dashboard link after the first successful run.

Start with the Bitbucket mirror workspace: [bitbucket.org/pipery-dev](https://bitbucket.org/pipery-dev).
