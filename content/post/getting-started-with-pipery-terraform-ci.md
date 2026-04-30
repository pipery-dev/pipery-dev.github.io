---
title: "Getting started with Pipery Terraform CI"
date: 2026-04-30
draft: false
description: "Use Pipery Terraform CI to run tfsec, dependency checks, tflint, validate, and plan for Terraform repositories with structured execution logs."
keywords:
  - Pipery Terraform CI
  - Terraform CI
  - tfsec
  - tflint
  - terraform plan automation
---

Infrastructure repositories deserve the same level of repeatability as application repos. `pipery-dev/pipery-terraform-ci` gives Terraform projects a shared CI pipeline that validates code, checks risk earlier, and leaves behind a structured log you can inspect later.

## Minimal workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    uses: pipery-dev/pipery-terraform-ci@v1
    with:
      project_path: .
    secrets: inherit
```

## What it runs

The action covers:

1. tfsec for SAST
2. dependency scanning
3. tflint
4. `terraform validate`
5. `terraform plan`
6. versioning
7. release handling

## Useful inputs

- `terraform_version`: pin the CLI version used by the repo
- `backend_config`: provide backend settings cleanly
- `var_file`: point at the right tfvars file
- `working_directory`: useful when the Terraform root is not the repo root

## Why this helps teams

Terraform workflows often grow hidden complexity around backends, environments, validation order, and plan behavior. A shared action makes the happy path repeatable across repos, while Pipery gives you the execution detail to understand a failed validate or plan run without digging through a long shell script.

If your team is trying to standardize infrastructure checks before merge, this is a strong first action to adopt.

Source and docs: [pipery-terraform-ci](https://github.com/pipery-dev/pipery-terraform-ci).
