---
title: "Running Pipery on GitLab CI"
date: 2026-05-15
draft: false
description: "Use Pipery GitLab mirror repositories, remote includes, CI/CD variables, artifacts, and pipery.jsonl logs to run reusable pipelines in GitLab CI."
keywords:
  - Pipery GitLab CI
  - GitLab CI templates
  - reusable GitLab pipelines
  - pipery.jsonl
  - CI/CD mirrors
---

Pipery is no longer a GitHub-only starting point. The Pipery pipeline repositories are mirrored to GitLab, so GitLab projects can import templates from `gitlab.com/pipery-dev` and keep the pipeline source close to the CI system that runs it.

That matters for teams standardizing on GitLab CI: the workflow stays Pipery, but the include path, variables, artifacts, and project permissions are native GitLab concepts.

## Minimal GitLab include

Create or update `.gitlab-ci.yml` in your application repository:

```yaml
include:
  - project: pipery-dev/npm-ci
    ref: v1.1.0
    file: /.gitlab-ci.yml

variables:
  PROJECT_PATH: "."
  PACKAGE_MANAGER: "auto"
  LOG_FILE: "pipery.jsonl"
```

Swap `pipery-npm-ci` for the pipeline family you need, for example `pipery-python-ci`, `pipery-docker-ci`, `pipery-terraform-ci`, `pipery-cloudrun-cd`, `pipery-helm-cd`, or `pipery-argocd-cd`.

## Configure protected variables

Put secrets in **Settings > CI/CD > Variables** instead of committing them to YAML.

Common variables include:

- `NPM_TOKEN` for npm publishing
- `PYPI_TOKEN` for Python package publishing
- `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` for container registries
- `GCP_SA_KEY` for Google Cloud Run deployments
- `KUBECONFIG` for Kubernetes and Helm deployments
- `ARGOCD_TOKEN` for ArgoCD deployments

Use protected and masked variables for production credentials. If you run release or deploy jobs only from protected branches, GitLab will keep those secrets out of untrusted branch pipelines.

## Keep the same Pipery controls

The GitLab templates map familiar Pipery inputs to GitLab variables. For example:

```yaml
variables:
  SKIP_SAST: "false"
  SKIP_SCA: "false"
  SKIP_LINT: "false"
  SKIP_BUILD: "false"
  SKIP_TEST: "false"
  VERSION_BUMP: "patch"
```

That gives platform teams a consistent control surface across GitHub Actions, GitLab CI, and Bitbucket Pipelines. A repository can move providers without inventing a new naming scheme for every pipeline option.

## Find the logs

Each GitLab pipeline publishes `pipery.jsonl` as an artifact where supported. That file contains the structured `psh` events for the run: command, working directory, environment snapshot, stdout, stderr, exit code, timing, and resource usage.

When a job fails, download the artifact or open it in the Pipery Dashboard. The useful debugging unit becomes the command that failed, not a whole CI job log pasted into a search box.

## Migration checklist

1. Pick the matching Pipery mirror repository on GitLab.
2. Import the template with a GitLab `project`, `ref`, and `file` include.
3. Move secrets into protected GitLab CI/CD variables.
4. Set only the variables your repository needs at first.
5. Confirm `pipery.jsonl` is available as a job artifact.
6. Tighten release and deploy jobs to protected branches or environments.

Start with the GitLab mirror group: [gitlab.com/pipery-dev](https://gitlab.com/pipery-dev).
