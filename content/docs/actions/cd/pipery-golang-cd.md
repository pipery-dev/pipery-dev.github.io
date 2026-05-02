---
title: "Pipery Go CD"
description: "CD pipeline for Go: download binary/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status"
type: "docs"
weight: 6
---

# Pipery Go CD

- Repository: [`pipery-golang-cd`](https://github.com/pipery-dev/pipery-golang-cd)
- Release tag: `v1`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for Go CD — download binary or image, deploy, and verify — with structured logging via [Pipery](https://pipery.dev).

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Pipery%20Go%20CD-blue?logo=github)](https://github.com/marketplace/actions/pipery-go-cd)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Usage

```yaml
name: CD
on:
  push:
    branches: [main]

jobs:
  cd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-golang-cd@v1
        with:
          artifact_name: my-app-linux-amd64
          artifact_version: latest
          deploy_target: cloud-run
          cloud_run_service: my-service
          cloud_run_region: us-central1
```

## Pipeline steps

| Step | Description | Skip input |
|---|---|---|
| Download | Download GitHub release artifact or pull Docker image | `skip_download` |
| Deploy | Deploy via ArgoCD, Cloud Run, Helm, or Ansible | `skip_deploy` |
| Status check | Verify deployment health | `skip_status_check` |

## Inputs

| Name | Default | Description |
|---|---|---|
| `artifact_name` | `` | GitHub release artifact name to download. |
| `artifact_version` | `latest` | GitHub release version tag. |
| `image_name` | `` | Container image to pull (alternative to artifact). |
| `image_tag` | `latest` | Container image tag. |
| `project_path` | `.` | Path to the project source tree. |
| `config_file` | `.github/pipery/config.yaml` | Path to Pipery config file. |
| `deploy_target` | `argocd` | Deployment target: `argocd`, `cloud-run`, `helm`, or `ansible`. |
| `deploy_strategy` | `rolling` | Deployment strategy: `rolling`, `blue-green`, or `canary`. |
| `argocd_server` | `` | ArgoCD server URL. |
| `argocd_app` | `` | ArgoCD application name. |
| `argocd_token` | `` | ArgoCD authentication token. |
| `cloud_run_service` | `` | Cloud Run service name. |
| `cloud_run_region` | `us-central1` | Cloud Run region. |
| `cloud_run_image` | `` | Container image to deploy to Cloud Run. |
| `helm_release` | `` | Helm release name. |
| `helm_chart` | `` | Helm chart path or reference. |
| `helm_namespace` | `default` | Kubernetes namespace. |
| `ansible_playbook` | `` | Path to Ansible playbook. |
| `ansible_inventory` | `` | Path to Ansible inventory. |
| `log_file` | `pipery.jsonl` | Path to the JSONL structured log file. |
| `skip_download` | `false` | Skip the download step. |
| `skip_deploy` | `false` | Skip the deploy step. |
| `skip_status_check` | `false` | Skip the post-deploy status check. |

## About Pipery

<img src="https://avatars.githubusercontent.com/u/270923927?s=32" width="22" align="center" /> [**Pipery**](https://pipery.dev) is an open-source CI/CD observability platform. Every step script runs under **psh** (Pipery Shell), which intercepts all commands and emits structured JSONL events — giving you full visibility into your pipeline without any manual instrumentation.

- Browse logs in the [Pipery Dashboard](https://github.com/pipery-dev/pipery-dashboard)
- Find all Pipery actions on [GitHub Marketplace](https://github.com/marketplace?q=pipery&type=actions)
- Source code: [pipery-dev](https://github.com/pipery-dev)

## Development

```bash
# Run the action locally against test-project/
pipery-actions test --repo .

# Regenerate docs
pipery-actions docs --repo .

# Dry-run release
pipery-actions release --repo . --dry-run
```
