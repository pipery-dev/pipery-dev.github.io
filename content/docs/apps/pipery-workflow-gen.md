---
title: "Pipery Workflow Generator"
type: "docs"
bookToC: true
weight: 3
---

# Pipery Workflow Generator

Pipery Workflow Generator creates CI/CD workflow files for GitHub Actions, GitLab CI, and Bitbucket Pipelines.

## Current Features

- GitHub Actions workflow generation under `.github/workflows/`
- GitLab CI generation with merge request support
- Bitbucket Pipelines generation with pull request support
- Provider-aware repository selection after GitHub, GitLab, or Bitbucket sign-in
- Helm chart deployment through ArgoCD GitOps updates

GitHub sign-in must include the `workflow` OAuth scope when the app opens pull requests that add or edit files under `.github/workflows`.

## Runtime Configuration

Keep provider secrets in Kubernetes secrets:

```bash
NEXTAUTH_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITLAB_CLIENT_ID=...
GITLAB_CLIENT_SECRET=...
BITBUCKET_CLIENT_ID=...
BITBUCKET_CLIENT_SECRET=...
```

`GITLAB_API_BASE` is non-sensitive and can be set through Helm values when a self-managed GitLab instance is used.

## Deployment

The workflow-gen release workflow uses `pipery-npm-ci@v1.1.0` for build and image publishing, then `pipery-argocd-cd@v1.1.0` for the GitOps handoff to `pipery-dev/pipery-argocd`.
