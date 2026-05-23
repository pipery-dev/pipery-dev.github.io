---
title: "pipery-deploy-bot"
type: "docs"
bookToC: true
weight: 2
---

# pipery-deploy-bot

`pipery-deploy-bot` schedules one-time GitHub Actions deployments. A workflow asks the bot to run a specific workflow at a specific UTC timestamp, and the bot calls `workflow_dispatch` at that time through a GitHub App installation token.

The bot stores scheduled deploys and trigger attempts in Postgres and exposes a simple dashboard at `/dashboard`.

## When to Use It

Use the deploy bot when a deploy is not repetitive enough for cron, but still needs a fixed release window, approval, or an external readiness check before it is scheduled.

Typical flow:

- An approved GitHub Actions workflow calls the deploy bot action.
- The bot records the requested deploy in Postgres.
- The scheduler triggers the configured workflow when `scheduled_at` is due.
- Operators review status and trigger attempts in the dashboard.

## Service Configuration

```json
{
  "installations": {
    "default": {
      "app_id": 12345,
      "installation_id": 67890,
      "private_key_file": "/run/secrets/github-app.pem"
    }
  }
}
```

Required runtime settings:

- `DATABASE_URL`: Postgres connection string.
- `PIPERY_DEPLOY_CONFIG`: path to the JSON config file.
- `PIPERY_DEPLOY_API_TOKEN`: optional bearer token for API and dashboard access.
- `SCHEDULER_INTERVAL`: optional poll interval, default `30s`.

Dex validation can be enabled with:

```bash
PIPERY_DEX_ISSUER=https://auth.pipery.dev/dex
PIPERY_DEPLOY_DEX_CLIENT_ID=pipery-deploy-bot
```

Keep `DATABASE_URL`, GitHub App private keys, Dex client secrets, and API tokens in Kubernetes secrets. Store non-sensitive settings such as public URLs, scheduler interval, namespace, and chart settings in Helm values.

## Scheduling Action

The repository ships a composite GitHub Action for scheduling a deploy from a workflow.

```yaml
name: Schedule production deploy

on:
  workflow_dispatch:
    inputs:
      deploy_at:
        required: true
        description: UTC RFC3339 timestamp, for example 2026-05-17T12:00:00Z
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

The action defaults to the current GitHub Actions runtime repository and ref. Set `repository`, or explicit `owner` and `repo`, only when scheduling a deploy for another repository.

## Helm

```sh
helm upgrade --install pipery-deploy-bot ./charts/pipery-deploy-bot \
  --namespace pipery \
  --create-namespace \
  --set database.existingSecret=pipery-deploy-bot-database \
  --set privateKey.existingSecret=pipery-deploy-bot-private-key \
  --set apiToken.existingSecret=pipery-deploy-bot-api-token
```

The chart can run the Postgres migration as a Helm pre-install/pre-upgrade hook. Set `migrations.enabled=false` if migrations are managed elsewhere.

## ArgoCD Release Flow

The repository CI workflow runs `pipery-dev/pipery-golang-ci@v1.1.0`. On pushes to `main` and `v*` tags it also uses `pipery-dev/pipery-argocd-cd@v1.1.0` to update `pipery-dev/pipery-argocd`:

- `applications/pipery-deploy-bot/application.yaml`
- `applications/pipery-deploy-bot/values.yaml`

Set `PIPERY_ARGOCD_TOKEN` in the bot repository to a token that can write to the private ArgoCD repository.
