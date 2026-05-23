---
title: "Scheduling one-time deploys with pipery-deploy-bot"
date: 2026-05-23
draft: false
description: "How pipery-deploy-bot schedules a single deployment at a fixed time without turning it into a recurring cron job."
keywords:
  - pipery-deploy-bot
  - scheduled deploy
  - GitHub Actions deployment
  - one-time deployment
  - Postgres
---

Some deploys need a release window but should not become a recurring scheduled workflow. That is the shape `pipery-deploy-bot` is built for.

A workflow can ask the bot to dispatch another GitHub Actions workflow at a specific time. The bot stores the schedule in Postgres, wakes up when the deploy is due, calls `workflow_dispatch`, and records the trigger result.

## When this is better than cron

Use a one-time scheduled deploy when:

- the release window is specific to one version
- approval happens before scheduling
- an external check decides whether the deploy should be scheduled
- operators need a dashboard showing pending deploys and trigger attempts

Cron is still right for repetitive jobs. A deploy for `v1.4.2` at a planned release window is different: it should exist once, be auditable, and then be done.

## Workflow shape

The scheduling action can run inside an approved GitHub Actions workflow:

```yaml
name: Schedule production deploy

on:
  workflow_dispatch:
    inputs:
      deploy_at:
        required: true
        description: UTC RFC3339 timestamp, for example 2026-05-23T18:00:00Z
      version:
        required: true

jobs:
  schedule:
    runs-on: ubuntu-latest
    steps:
      - uses: pipery-dev/pipery-deploy-bot@v1
        with:
          api-url: ${{ secrets.PIPERY_DEPLOY_BOT_URL }}
          api-token: ${{ secrets.PIPERY_DEPLOY_BOT_TOKEN }}
          idempotency-key: production-${{ inputs.version }}-${{ inputs.deploy_at }}
          workflow-id: deploy.yml
          scheduled-at: ${{ inputs.deploy_at }}
          inputs-json: '{"environment":"production","version":"${{ inputs.version }}"}'
```

The action defaults to the current GitHub Actions repository and ref. Override `repository`, or `owner` and `repo`, only when scheduling a deploy for another repository.

## Why Postgres matters

Scheduled deploys need state:

- what should run
- when it should run
- who requested it
- whether it has already been triggered
- what GitHub returned when the trigger call happened

Postgres gives the bot a durable record, and the dashboard exposes that record to operators.

## Conditions and approvals

Keep approvals in the workflow that schedules the deploy. For example, use GitHub Environments, required reviewers, branch protection, or an external readiness check before the schedule request is sent to the bot.

That keeps the bot small: it records approved work and dispatches it at the correct time. Policy remains in the workflow and repository settings where teams already review it.

## Runtime configuration

Keep these values in Kubernetes or CI secrets:

- `DATABASE_URL`
- GitHub App private key
- bot API token
- Dex client secret, if Dex validation is enabled

Use Helm values for non-sensitive settings like the public URL, scheduler interval, namespace, and image configuration.
