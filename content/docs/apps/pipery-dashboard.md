---
title: "Pipery Dashboard"
type: "docs"
bookToC: true
weight: 2
---

# Pipery Dashboard

Pipery Dashboard opens `pipery.jsonl` artifacts from CI/CD runs and turns them into a searchable debugging workspace.

## Current Features

- GitHub, GitLab, and Bitbucket Cloud login through provider OAuth
- Repository, branch, workflow, run, and artifact browsing
- Artifact ZIP inspection with automatic `.jsonl` extraction
- Preference for `pipery.jsonl` when present
- Local cache for reopening recent logs
- Shared parsing logic with the Pipery CLI
- Helm chart deployment through ArgoCD GitOps updates

## Runtime Configuration

Sensitive provider OAuth values should be injected at runtime:

```bash
NEXTAUTH_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITLAB_CLIENT_ID=...
GITLAB_CLIENT_SECRET=...
BITBUCKET_CLIENT_ID=...
BITBUCKET_CLIENT_SECRET=...
```

Use Helm values for non-sensitive settings such as `NEXTAUTH_URL`, public hostnames, image repository, and Kubernetes service configuration.

## Deployment

The dashboard workflow uses `pipery-npm-ci@v1.1.0` to build and publish the image, then uses `pipery-argocd-cd@v1.1.0` to publish the Helm chart update into `pipery-dev/pipery-argocd`.
