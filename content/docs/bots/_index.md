---
title: "GitHub Bots"
type: "docs"
bookCollapseSection: false
bookToC: false
weight: 4
---

# GitHub Bots

Pipery bots are small GitHub App services for release and deploy workflows that should be controlled outside normal developer pushes.

- [pipery-release-bot](/docs/bots/pipery-release-bot/) creates configured release branches, optional tags, and GitHub Releases from markdown notes.
- [pipery-deploy-bot](/docs/bots/pipery-deploy-bot/) schedules one-time GitHub Actions deploys and records trigger attempts in Postgres.

Both bots ship Helm charts and publish ArgoCD Application updates to the private `pipery-dev/pipery-argocd` repository from their CI workflows.

Both bots can also validate Dex-issued bearer tokens. See [Dex-backed Pipery Auth](/docs/apps/pipery-auth/) for the shared issuer and runtime secret model.
