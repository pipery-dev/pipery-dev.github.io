---
title: "Pipery actions v1.1.0: exact pins, tested scenarios, and GitOps handoff"
date: 2026-05-23
draft: false
description: "What changed in Pipery actions v1.1.0, including exact version pins, cross-platform builds, action scenario tests, and ArgoCD chart publishing."
keywords:
  - Pipery v1.1.0
  - Pipery actions
  - GitHub Actions
  - GitLab CI
  - Bitbucket Pipelines
  - ArgoCD
---

Pipery actions `v1.1.0` is the current release across the supported action catalog. The release is mostly about making the platform easier to trust: examples now use exact pins, action repositories carry richer scenario coverage, and the deployment handoff into ArgoCD is more explicit.

## Exact version pins

The docs now show exact `v1.1.0` usage for GitHub Actions:

```yaml
- uses: pipery-dev/npm-ci@v1.1.0
```

The same tag is used in GitLab CI includes:

```yaml
include:
  - project: pipery-dev/npm-ci
    ref: v1.1.0
    file: /.gitlab-ci.yml
```

And in Bitbucket shared pipeline imports:

```yaml
definitions:
  imports:
    pipery-npm-ci: pipery-dev/npm-ci:v1.1.0
```

The major `v1` line can still be useful for teams that want rolling minor updates. Exact pins are better for platform-owned golden workflows, regulated repositories, and migrations that need deterministic behavior.

## Cross-platform release work

Go and C/C++ actions now support cross-platform release targets. The common target set is:

- `linux/amd64`
- `linux/arm64`
- `windows/amd64`
- `darwin/amd64`

That lets a single release workflow produce artifacts for the platforms most teams need first, without each application repository rebuilding the release matrix by hand.

## Scenario-tested actions

Each action repository now has test projects that exercise the action before release. The useful bit is not just the happy path: failing-build and failing-test fixtures make sure the action exits non-zero when the underlying project is broken.

That gives release workflows a simple contract:

1. Run action scenarios.
2. Fail fast if a workflow change breaks expected behavior.
3. Publish only after the action passes its own representative projects.

## ArgoCD chart handoff

`pipery-argocd-cd@v1.1.0` can publish generated ArgoCD Application and values updates into the `pipery-dev/pipery-argocd` GitOps repository. It can also validate a Helm chart before publishing:

```yaml
- uses: pipery-dev/argocd-cd@v1.1.0
  with:
    publish_helm_chart_update: true
    validate_helm_chart: true
    chart_path: charts/my-app
    deploy_values_path: deploy/values.yaml
```

`deploy_values_path` is useful when runtime configuration should be reviewable as a YAML file instead of packed into a long workflow input.

## What to update

For existing repositories, update the action reference first. Then check provider-specific imports and shared pipeline references.

The most important follow-up is secret hygiene: sensitive runtime values belong in CI secrets or Kubernetes secrets. Helm values should carry non-sensitive deployment shape, such as app names, namespaces, image repositories, chart paths, and public URLs.
