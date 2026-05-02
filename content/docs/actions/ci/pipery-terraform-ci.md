---
title: "Pipery Terraform CI"
description: "CI pipeline for Terraform: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release"
type: "docs"
weight: 8
---

# Pipery Terraform CI

- Repository: [`pipery-terraform-ci`](https://github.com/pipery-dev/pipery-terraform-ci)
- Release tag: `v3`
- Catalog: [/catalog/](/catalog/)

CI pipeline for Terraform: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release

## Status

- Owner: `pipery-dev`
- Repository: `pipery-terraform-ci`
- Marketplace category: `continuous-integration`
- Current version: `3.0.0`

## Usage

```yaml
name: Example
on: [push]

jobs:
  run-action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-terraform-ci@v3
        with:
          project_path: .
          config_file: .github/pipery/config.yaml
          terraform_version: latest
          backend_config: 
          var_file: 
          working_directory: .
          skip_sast: false
          skip_sca: false
          skip_lint: false
          skip_validate: false
          skip_plan: false
          skip_version: false
          skip_release: false
          log_file: pipery.jsonl
```

## Inputs

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `project_path` | no | `.` | Path to the Terraform root module. |
| `config_file` | no | `.github/pipery/config.yaml` | Path to the pipery config file. |
| `terraform_version` | no | `latest` | Terraform CLI version to use. |
| `backend_config` | no | `` | Comma-separated backend config vars (key=val). |
| `var_file` | no | `` | Path to a .tfvars file. |
| `working_directory` | no | `.` | Working directory for Terraform commands. |
| `skip_sast` | no | `false` | Skip tfsec SAST scan. |
| `skip_sca` | no | `false` | Skip SCA dependency scan. |
| `skip_lint` | no | `false` | Skip tflint lint. |
| `skip_validate` | no | `false` | Skip terraform validate. |
| `skip_plan` | no | `false` | Skip terraform plan. |
| `skip_version` | no | `false` | Skip version step. |
| `skip_release` | no | `false` | Skip release step. |
| `log_file` | no | `pipery.jsonl` | Path to write the JSONL log file. |

## Outputs

No outputs.

## Development

This repository is managed with `pipery-tooling`.

```bash
pipery-actions test --repo .
pipery-actions docs --repo .
pipery-actions release --repo . --dry-run
```

By default, `pipery-actions test --repo .` executes the action against `test-project` and validates `pipery.jsonl`.

## Marketplace Release Flow

1. Update the implementation and changelog.
2. Run `pipery-actions release --repo .`.
3. Push the created git tag and major tag alias.
4. Publish the GitHub release.
