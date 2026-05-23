---
title: "pipery-release-bot"
type: "docs"
bookToC: true
weight: 1
---

# pipery-release-bot

`pipery-release-bot` is a GitHub App backed service for creating release branches through a controlled API. It can create one or more configured release branch patterns, optionally create matching tags, and open a GitHub Release from a markdown file in the target repository.

## When to Use It

Use the release bot when `release/*` branches should exist only after an approved release operation, not from direct developer pushes. A common setup is:

- Protect `release/*` with a repository ruleset.
- Allow bypass only for the Pipery release GitHub App.
- Trigger the bot from an approved workflow, dashboard, or internal release process.

## Configuration

The service reads JSON from `PIPERY_RELEASE_CONFIG`.

```json
{
  "listen_addr": ":8080",
  "target": {
    "owner": "pipery-dev",
    "repo": "example",
    "base_ref": "main",
    "version": "v1.2.3",
    "release_notes_path": "CHANGELOG.md"
  },
  "branch_patterns": [
    {
      "pattern": "release/{version}",
      "create_tag": true,
      "tag_name": "{version}",
      "create_release": true
    }
  ],
  "installations": {
    "default": {
      "app_id": 12345,
      "installation_id": 67890,
      "private_key_file": "/run/secrets/github-app.pem"
    }
  }
}
```

Private keys should be stored in Kubernetes secrets or another secret manager. The bot can load a key from `private_key_file` or `private_key_env`.

## Authentication

The release bot supports both workflow automation tokens and Dex bearer-token validation.

```bash
PIPERY_DEX_ISSUER=https://auth.pipery.dev/dex
PIPERY_RELEASE_DEX_CLIENT_ID=pipery-release-bot
PIPERY_RELEASE_API_TOKEN=...
```

Keep GitHub App private keys, API tokens, and Dex client secrets in Kubernetes secrets. Non-sensitive settings such as issuer URL, listen address, and branch patterns can live in Helm values.

## API

```sh
curl -X POST https://release-bot.example.com/v1/release-plans/execute \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "installation_key": "default",
    "owner": "pipery-dev",
    "repo": "example",
    "version": "v1.2.3",
    "base_ref": "main",
    "release_notes_path": "CHANGELOG.md"
  }'
```

Request values override the configured defaults. The configured `branch_patterns` decide which branches, tags, and GitHub Releases are created.

## Helm

```sh
helm upgrade --install pipery-release-bot ./charts/pipery-release-bot \
  --namespace pipery \
  --create-namespace \
  --set privateKey.existingSecret=pipery-release-bot-private-key \
  --set apiToken.existingSecret=pipery-release-bot-api-token
```

## ArgoCD Release Flow

The repository CI workflow runs `pipery-dev/pipery-golang-ci@v1.1.0`. On pushes to `main` and `v*` tags it also uses `pipery-dev/pipery-argocd-cd@v1.1.0` to update `pipery-dev/pipery-argocd`:

- `applications/pipery-release-bot/application.yaml`
- `applications/pipery-release-bot/values.yaml`

Set `PIPERY_ARGOCD_TOKEN` in the bot repository to a token that can write to the private ArgoCD repository.
