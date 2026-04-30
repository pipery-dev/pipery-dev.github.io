---
title: "Deploying to Cloud Run with Pipery Cloud Run CD"
date: 2026-04-30
draft: false
description: "Ship a container to Google Cloud Run with Pipery Cloud Run CD, including image push, deploy, traffic migration, health checks, and replayable logs."
keywords:
  - Pipery Cloud Run CD
  - Cloud Run deployment
  - GitHub Actions CD
  - Google Cloud Run CI/CD
  - deployment observability
---

Once a service is built and tested, the next question is how to deploy it without turning your workflow into another custom shell project. `pipery-dev/pipery-cloudrun-cd` gives you a reusable Cloud Run deployment step with the same observability story as the CI actions.

## Minimal workflow

```yaml
name: CD

on:
  push:
    branches: [main]

jobs:
  cd:
    uses: pipery-dev/pipery-cloudrun-cd@v1
    with:
      image_name: ghcr.io/acme/api
      service_name: api
      region: europe-west1
      project_id: acme-platform-prod
    secrets: inherit
```

## What the action does

The deployment path is straightforward:

1. push the container image
2. deploy with `gcloud run deploy`
3. migrate traffic
4. run a status check

## Inputs to care about early

- `image_name`: the image being deployed
- `image_tag`: defaults to the current Git SHA, which is a sensible starting point
- `service_name`: the Cloud Run service to update
- `region` and `project_id`: define the deployment target
- `traffic`: useful when you want a more careful rollout

## Why teams like this pattern

Cloud Run deployment is simple enough to start casually and tricky enough to drift over time. One team adds traffic handling, another adds status checks, another copies an old auth pattern. A shared action gives you the same deployment shape everywhere, and Pipery’s `psh` logs make post-deploy debugging much calmer when a rollout does not behave the way you expected.

Source and docs: [pipery-cloudrun-cd](https://github.com/pipery-dev/pipery-cloudrun-cd).
