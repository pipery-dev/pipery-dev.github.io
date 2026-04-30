---
title: "Getting started with Pipery Docker CI"
date: 2026-04-30
draft: false
description: "Adopt Pipery Docker CI to lint Dockerfiles, scan images, build containers, run smoke tests, tag images, and push them through GitHub Actions."
keywords:
  - Pipery Docker CI
  - Docker CI
  - container security scanning
  - GitHub Actions docker build
  - GHCR automation
---

Container pipelines get messy quickly. `pipery-dev/pipery-docker-ci` wraps the usual Docker CI sequence into one reusable action, with structured logging built in.

Instead of hand-writing Docker login, build, scan, test, tag, and push steps in every repository, you can move that workflow into a single maintained action call.

## Minimal workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-docker-ci@v1
        with:
          image_name: ghcr.io/${{ github.repository }}
          registry_username: ${{ github.actor }}
          registry_password: ${{ secrets.GITHUB_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## What it handles

The action covers:

1. Dockerfile linting with Hadolint
2. SAST with Trivy config scanning
3. SCA with Trivy image scanning
4. `docker build`
5. container smoke testing
6. semantic versioning
7. image tagging
8. registry push

## Inputs teams usually care about first

- `dockerfile`: useful when the repo has more than one Dockerfile
- `image_name`: the published registry path
- `build_args`: pass image build arguments cleanly
- `platforms`: define target platforms early if multi-arch matters
- `tests_path`: provide the smoke-test command you want run inside the container

## Where the observability matters

Docker builds can fail for reasons that are annoyingly context-heavy: auth, missing files, cache misses, registry problems, and test commands that only fail inside the built image. Because Pipery captures each command as it runs, the failure is not trapped inside a giant opaque shell block. You get replayable, step-level logs in `pipery.jsonl`.

That is the difference between “the image push step failed somewhere” and “this exact command failed with this exact output.”

Source and docs: [pipery-docker-ci](https://github.com/pipery-dev/pipery-docker-ci).
