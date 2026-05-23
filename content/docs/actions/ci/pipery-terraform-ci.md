---
title: "Pipery Terraform CI"
description: "CI pipeline for Terraform: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release"
type: "docs"
weight: 8
---

# Pipery Terraform CI

- Repository: [`pipery-terraform-ci`](https://github.com/pipery-dev/pipery-terraform-ci)
- Release tag: `v1.1.0`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for a complete Terraform CI pipeline with structured logging via [Pipery](https://pipery.dev).

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Pipery%20Terraform%20CI-blue?logo=github)](https://github.com/marketplace/actions/pipery-terraform-ci)
[![Version](https://img.shields.io/badge/version-1.1.0-blue)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Table of Contents

- [Quick Start](#quick-start)
- [Pipeline Overview](#pipeline-overview)
- [Configuration Options](#configuration-options)
- [Usage Examples](#usage-examples)
- [GitLab CI](#gitlab-ci)
- [Bitbucket Pipelines](#bitbucket-pipelines)
- [About Pipery](#about-pipery)
- [Development](#development)

## Quick Start

```yaml
name: CI
on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-terraform-ci@v1.1.0
        with:
          project_path: .
          terraform_version: latest
```

## Pipeline Overview

| Step | Tool | Skip Input | Description |
| --- | --- | --- | --- |
| SAST | tfsec | `skip_sast` | Detects Terraform security misconfigurations |
| SCA | dependency-check | `skip_sca` | Identifies vulnerable dependencies |
| Lint | tflint | `skip_lint` | Enforces Terraform style and best practices |
| Validate | terraform validate | `skip_validate` | Validates Terraform configuration syntax |
| Plan | terraform plan | `skip_plan` | Creates deployment plan |
| Version | Semantic versioning | `skip_versioning` | Bumps version and creates git tag |
| Release | GitHub Release | `skip_release` | Publishes plan artifacts to GitHub |
| Reintegrate | Git merge | `skip_reintegration` | Merges back to default branch |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `project_path` | `.` | Path to the Terraform root module. |
| `config_file` | `.pipery/config.yaml` | Path to Pipery config file. |
| `terraform_version` | `latest` | Terraform CLI version to use. |
| `backend_config` | `` | Comma-separated backend config vars (key=val). |
| `var_file` | `` | Path to a .tfvars file. |
| `working_directory` | `.` | Working directory for Terraform commands. |
| `log_file` | `pipery.jsonl` | Path to write the JSONL log file. |
| `skip_sast` | `false` | Skip tfsec SAST scan. |
| `skip_sca` | `false` | Skip SCA dependency scan. |
| `skip_lint` | `false` | Skip tflint lint. |
| `skip_validate` | `false` | Skip terraform validate. |
| `skip_plan` | `false` | Skip terraform plan. |
| `skip_versioning` | `false` | Skip versioning step. |
| `skip_release` | `false` | Skip release step. |
| `skip_reintegration` | `false` | Skip reintegration step. |

## Usage Examples

### Example 1: Basic Terraform validation and plan

```yaml
name: CI
on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-terraform-ci@v1.1.0
        with:
          project_path: .
          terraform_version: latest
```

### Example 2: With backend configuration

```yaml
- uses: pipery-dev/pipery-terraform-ci@v1.1.0
  with:
    project_path: ./infrastructure
    terraform_version: 1.7
    backend_config: bucket=my-bucket,key=prod/terraform.tfstate,region=us-east-1
```

### Example 3: Using variables file

```yaml
- uses: pipery-dev/pipery-terraform-ci@v1.1.0
  with:
    project_path: .
    terraform_version: latest
    var_file: terraform.tfvars
```

### Example 4: Skip security checks

```yaml
- uses: pipery-dev/pipery-terraform-ci@v1.1.0
  with:
    project_path: .
    skip_sast: true
    skip_sca: true
```

### Example 5: Multiple workspaces

```yaml
- uses: pipery-dev/pipery-terraform-ci@v1.1.0
  with:
    project_path: ./terraform/prod
    working_directory: ./terraform/prod
    terraform_version: latest
    var_file: prod.tfvars
```

### Example 6: Custom Terraform version with release

```yaml
- uses: pipery-dev/pipery-terraform-ci@v1.1.0
  with:
    project_path: .
    terraform_version: 1.6
    backend_config: bucket=my-state-bucket
```

## GitLab CI

Use the GitLab mirror template when `.gitlab-ci.yml` is published for this pipeline family. Import it from the mirrored GitLab project or use it as a reference implementation for running the same Pipery pipeline outside GitHub Actions.

The GitLab pipeline maps action inputs to CI/CD variables, publishes `pipery.jsonl` as an artifact, and maintains the same skip controls. Store credentials as protected GitLab CI/CD variables.

```yaml
include:
  - project: pipery-dev/pipery-terraform-ci
    ref: v1.1.0
    file: /.gitlab-ci.yml
```

### GitLab CI Variables

Configure these protected variables in **Settings > CI/CD > Variables**:

- `TERRAFORM_VERSION` - Terraform version (default: latest)
- `BACKEND_CONFIG` - Backend configuration (key=val format)
- `VAR_FILE` - Path to .tfvars file

## Bitbucket Pipelines

Bitbucket Cloud pipelines provide an alternative to GitHub Actions. Use Bitbucket shared pipeline imports to reference the exported Pipery pipeline instead of copying YAML into every application repository.

### Getting Started

1. Add a Bitbucket import source for the shared Pipery pipeline and import the exported pipeline by name:

```yaml
definitions:
  imports:
    pipery-shared: pipery-dev/pipery-terraform-ci:v1.1.0
    pipery-custom: pipery-dev/pipery-terraform-ci:v1.1.0:.bitbucket/shared-pipelines.yml

pipelines:
  branches:
    main:
      import: pipery-terraform-ci@pipery-shared

  custom:
    run-pipery:
      import: pipery-terraform-ci@pipery-custom
```

Use `{project-path}/{repo-slug}:{branch-or-tag}` for a shared repository `bitbucket-pipelines.yml`, or `{project-path}/{repo-slug}:{branch-or-tag}:{config-filepath}` for another exported YAML file.

2. Configure Protected Variables in **Repository Settings > Pipelines > Repository Variables**:
   - `TERRAFORM_VERSION` - Terraform version (default: latest)
   - `BACKEND_CONFIG` - Backend configuration variables
3. Commit and push to trigger the pipeline

### Pipeline Stages

The Bitbucket equivalent follows the same structure:

checkout → setup → SAST (tfsec) → SCA (dependency-check) → lint (tflint) → validate → plan → versioning → release → reintegration → logs

### Skip Flags

Disable any stage using environment variables:

- `SKIP_SAST`, `SKIP_SCA`, `SKIP_LINT`, `SKIP_VALIDATE`, `SKIP_PLAN`, `SKIP_VERSIONING`, `SKIP_RELEASE`, `SKIP_REINTEGRATION`

Example: Set `SKIP_SAST=true` to skip security scanning.

### Features

- Terraform security scanning (tfsec)
- Linting and best practices (tflint)
- Syntax validation
- Plan artifact generation
- Dependency vulnerability checking
- Automatic versioning and tagging
- JSONL-based pipeline logging
- 30-90 day artifact retention

## About Pipery

<img src="https://avatars.githubusercontent.com/u/270923927?s=32" alt="Pipery" width="22" align="center" /> [**Pipery**](https://pipery.dev) is an open-source CI/CD observability platform. Every step script runs under **psh** (Pipery Shell), which intercepts all commands and emits structured JSONL events — giving you full visibility into your pipeline without any manual instrumentation.

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
