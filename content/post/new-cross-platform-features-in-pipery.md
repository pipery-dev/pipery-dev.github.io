---
title: "New cross-platform features in Pipery"
date: 2026-05-15
draft: false
description: "A practical overview of Pipery mirror repositories, GitLab CI templates, Bitbucket Pipelines support, shared skip flags, artifacts, and dashboard links."
keywords:
  - Pipery features
  - cross-platform CI/CD
  - GitHub Actions
  - GitLab CI
  - Bitbucket Pipelines
  - Pipery Dashboard
---

Pipery has been growing from reusable GitHub Actions into a portable CI/CD layer that can run across GitHub Actions, GitLab CI, and Bitbucket Pipelines. The newer platform work is meant to make provider changes less dramatic: the pipeline family stays familiar even when the CI syntax changes.

Here are the features worth knowing first.

## Mirror repositories

Pipery repositories are mirrored beyond GitHub, including GitLab and Bitbucket. That means teams can discover templates and review pipeline source from the provider they already use.

For GitLab CI, import templates from the GitLab mirror:

```yaml
include:
  - project: pipery-dev/pipery-python-ci
    ref: v1
    file: /.gitlab-ci.yml
```

For Bitbucket, start from the mirrored repository and review the matching `bitbucket-pipelines.yml` together with the `src/` step scripts it calls. When you adopt the template in an application repository, keep those script paths valid.

## Provider-native templates

Each provider has its own CI model, so Pipery does not pretend one YAML file can be pasted everywhere unchanged.

Instead, each pipeline family keeps equivalent behavior in provider-native form:

- GitHub Actions uses reusable action calls and `with:` inputs.
- GitLab CI uses `include: remote`, variables, artifacts, and protected variables.
- Bitbucket Pipelines uses sequential steps, repository variables, secured values, and artifacts.

The implementation changes, but the intent stays consistent.

## Shared pipeline controls

Pipery templates expose common controls across providers:

```yaml
SKIP_SAST: "false"
SKIP_SCA: "false"
SKIP_LINT: "false"
SKIP_BUILD: "false"
SKIP_TEST: "false"
SKIP_RELEASE: "true"
LOG_FILE: "pipery.jsonl"
```

These flags are useful during rollout. A team can begin with lint and tests, then add release or deployment once credentials, approvals, and branch protections are ready.

## Structured artifacts

The most important artifact is still `pipery.jsonl`. Every command executed through `psh` produces structured events with timing, output, exit status, and context.

That makes failures easier to compare across providers. A Docker scan failure in GitLab and the same failure in Bitbucket should produce a recognizable Pipery event even though the CI job wrapper is different.

## Dashboard links

Pipery templates are also moving toward easier dashboard handoff. Where provider metadata is available, the pipeline can publish or print a link that points the Pipery Dashboard at the run artifact.

That is especially useful for Bitbucket and GitLab users who want a consistent debugging surface without leaving the provider-specific build page behind.

## What to update in older examples

Older GitLab examples may still show GitHub raw imports. Treat those as legacy examples and use the GitLab mirror form instead:

```yaml
include:
  - project: pipery-dev/pipery-npm-ci
    ref: v1
    file: /.gitlab-ci.yml
```

That keeps GitLab projects pointed at GitLab-hosted mirrors and avoids a quiet dependency on GitHub availability for GitLab pipeline startup.

The same pattern applies to the other pipeline families:

```yaml
include:
  - project: pipery-dev/pipery-cloudrun-cd
    ref: v1
    file: /.gitlab-ci.yml
```

## Recommended rollout path

1. Pick one repository and one Pipery pipeline family.
2. Use the native template for your CI provider.
3. Keep release or deploy disabled until validation is passing.
4. Publish `pipery.jsonl` as an artifact from the beginning.
5. Wire credentials through provider-native protected or secured variables.
6. Use the same skip flags and log conventions across the next repositories.

The result is less copy-paste pipeline drift, and a cleaner path when one team uses GitHub Actions while another uses GitLab CI or Bitbucket Pipelines.
