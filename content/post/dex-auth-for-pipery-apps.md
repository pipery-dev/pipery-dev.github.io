---
title: "Using Dex as the Pipery auth issuer"
date: 2026-05-23
draft: false
description: "How Pipery uses Dex for shared identity while dashboard and workflow generation still keep provider OAuth tokens for repository API access."
keywords:
  - Pipery Auth
  - Dex
  - OIDC
  - GitHub OAuth
  - GitLab OAuth
  - Bitbucket OAuth
---

Pipery Auth is now Dex-backed. Dex gives Pipery one OIDC issuer for the services that need shared identity:

```text
https://auth.pipery.dev/dex
```

That issuer can broker login through GitHub, GitLab, and Bitbucket Cloud connectors, while each Pipery app keeps a clear boundary around what it needs from the provider.

## What Dex owns

Dex owns the central issuer and client registration model. Pipery registers clients for:

- `pipery-dashboard`
- `pipery-workflow-gen`
- `pipery-release-bot`
- `pipery-deploy-bot`

The bots can validate Dex bearer tokens:

```bash
PIPERY_DEX_ISSUER=https://auth.pipery.dev/dex
PIPERY_RELEASE_DEX_CLIENT_ID=pipery-release-bot
PIPERY_DEPLOY_DEX_CLIENT_ID=pipery-deploy-bot
```

Static API tokens still work for workflow-triggered automation where a GitHub Actions job calls a bot endpoint without an interactive user.

## Why dashboard and workflow-gen still use provider OAuth

Dashboard and workflow-gen do repository operations. The dashboard needs to list repositories, workflows, runs, and artifacts. Workflow-gen needs to create pull requests or merge requests that add CI files.

Those operations require provider API tokens. Dex is an identity broker, not a general-purpose way to pass every upstream provider token into an app session. So dashboard and workflow-gen sign in directly with GitHub, GitLab, or Bitbucket Cloud when they need provider API access.

This keeps the model honest:

- Dex is the shared issuer.
- Provider OAuth is used when an app must call provider APIs as the signed-in user.
- GitHub Apps and bot credentials are used for automation that should not depend on a human OAuth session.

## Secret placement

OAuth client secrets should be runtime secrets. In Kubernetes, keep connector and client credentials in secrets such as:

```text
pipery-dex-connectors
pipery-dex-clients
```

Non-sensitive settings can stay in Helm values:

- public issuer URL
- redirect URLs
- app hostnames
- Kubernetes namespace
- service and ingress configuration

This split makes ArgoCD values reviewable without putting credentials into the GitOps repository.

## A practical rollout

Start with GitHub as the first connector if most repositories live there. Add GitLab and Bitbucket Cloud once the redirect URLs and OAuth apps are configured for dashboard and workflow-gen.

For bots, configure Dex validation separately from GitHub App installation credentials. The identity layer says who is allowed to ask for an operation; the GitHub App installation token performs the repository operation.
