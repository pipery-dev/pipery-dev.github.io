---
title: "Dex-backed Pipery Auth"
type: "docs"
bookToC: true
weight: 1
---

# Dex-backed Pipery Auth

`pipery-auth` is now a Dex-backed OIDC service. Dex is the shared issuer for Pipery services:

```text
https://auth.pipery.dev/dex
```

Dex brokers identity through GitHub, GitLab, and Bitbucket Cloud connectors and exposes static OIDC clients for:

- `pipery-dashboard`
- `pipery-workflow-gen`
- `pipery-release-bot`
- `pipery-deploy-bot`

## Runtime Secrets

OAuth client IDs and secrets should be runtime secrets, not baked into public values files.

Expected Kubernetes secrets:

```text
pipery-dex-connectors:
  github-client-id
  github-client-secret
  gitlab-client-id
  gitlab-client-secret
  bitbucket-client-id
  bitbucket-client-secret

pipery-dex-clients:
  dashboard-client-secret
  workflow-gen-client-secret
  release-bot-client-secret
  deploy-bot-client-secret
```

Use Helm values for non-sensitive settings such as hostnames, redirect URLs, namespaces, and issuer URLs.

## Bots

The bots can validate Dex bearer tokens when configured:

```bash
PIPERY_DEX_ISSUER=https://auth.pipery.dev/dex
PIPERY_RELEASE_DEX_CLIENT_ID=pipery-release-bot
PIPERY_DEPLOY_DEX_CLIENT_ID=pipery-deploy-bot
```

Static API token environment variables still work for workflow-triggered automation:

```bash
PIPERY_RELEASE_API_TOKEN=...
PIPERY_DEPLOY_API_TOKEN=...
```

## Dashboard and Workflow Generator

Dashboard and workflow-gen sign in directly with GitHub, GitLab, or Bitbucket Cloud because they need provider API tokens for repository operations. Dex still owns the central issuer and client registration pattern for OIDC-only flows.
