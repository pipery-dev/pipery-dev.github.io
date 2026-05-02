---
title: "Pipery Action Catalog"
description: "Catalog of Pipery CI and CD GitHub Actions, with links to source repositories and release-tag documentation."
---

# Pipery Action Catalog

Browse Pipery GitHub Actions by pipeline type. Each entry links to the source repository and its docs page generated from the latest release-tag README.

## CI Actions

| Action | Description | Version | Docs | Source |
|---|---|---|---|---|
| Pipery C/C++ CI | CI pipeline for C/C++: SAST, SCA, lint, build, test, versioning, packaging, release, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-cpp-ci/) | [GitHub](https://github.com/pipery-dev/pipery-cpp-ci) |
| Pipery Docker CI | CI pipeline for Docker: lint (hadolint), SAST, SCA, build, test, versioning, push image, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-docker-ci/) | [GitHub](https://github.com/pipery-dev/pipery-docker-ci) |
| Pipery Go CI | CI pipeline for Go: SAST, SCA, lint, build, test, versioning, packaging, release, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-golang-ci/) | [GitHub](https://github.com/pipery-dev/pipery-golang-ci) |
| Pipery Java CI | CI pipeline for Java: SAST, SCA, lint, build, test, versioning, packaging, release, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-java-ci/) | [GitHub](https://github.com/pipery-dev/pipery-java-ci) |
| Pipery npm CI | CI pipeline for npm/Node.js: SAST, SCA, lint, build, test, versioning, packaging, publish, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-npm-ci/) | [GitHub](https://github.com/pipery-dev/pipery-npm-ci) |
| Pipery Python CI | CI pipeline for Python: SAST, SCA, lint, build, test, versioning, packaging, release, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-python-ci/) | [GitHub](https://github.com/pipery-dev/pipery-python-ci) |
| Pipery Rust CI | CI pipeline for Rust: SAST, SCA, lint, build, test, versioning, packaging, release, reintegration | `v1` | [Docs](/docs/actions/ci/pipery-rust-ci/) | [GitHub](https://github.com/pipery-dev/pipery-rust-ci) |
| Pipery Terraform CI | CI pipeline for Terraform: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release | `v3` | [Docs](/docs/actions/ci/pipery-terraform-ci/) | [GitHub](https://github.com/pipery-dev/pipery-terraform-ci) |

## CD Actions

| Action | Description | Version | Docs | Source |
|---|---|---|---|---|
| Pipery Ansible CD | CD pipeline for Ansible: install requirements → run playbook → verify status. Deploy to VMs or bare metal. | `v3` | [Docs](/docs/actions/cd/pipery-ansible-cd/) | [GitHub](https://github.com/pipery-dev/pipery-ansible-cd) |
| Pipery ArgoCD CD | CD pipeline for ArgoCD: update image tag → sync application → wait for Argo rollout | `v3` | [Docs](/docs/actions/cd/pipery-argocd-cd/) | [GitHub](https://github.com/pipery-dev/pipery-argocd-cd) |
| Pipery C/C++ CD | CD pipeline for C/C++: download binary/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-cpp-cd/) | [GitHub](https://github.com/pipery-dev/pipery-cpp-cd) |
| Pipery Cloud Run CD | CD pipeline for Google Cloud Run: push image → gcloud run deploy → traffic migration and health check | `v3` | [Docs](/docs/actions/cd/pipery-cloudrun-cd/) | [GitHub](https://github.com/pipery-dev/pipery-cloudrun-cd) |
| Pipery Docker CD | CD pipeline for Docker: pull image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-docker-cd/) | [GitHub](https://github.com/pipery-dev/pipery-docker-cd) |
| Pipery Go CD | CD pipeline for Go: download binary/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-golang-cd/) | [GitHub](https://github.com/pipery-dev/pipery-golang-cd) |
| Pipery Helm CD | CD pipeline for Helm: update chart values → helm upgrade → wait for Kubernetes rollout | `v3` | [Docs](/docs/actions/cd/pipery-helm-cd/) | [GitHub](https://github.com/pipery-dev/pipery-helm-cd) |
| Pipery Java CD | CD pipeline for Java: download JAR/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-java-cd/) | [GitHub](https://github.com/pipery-dev/pipery-java-cd) |
| Pipery npm CD | CD pipeline for npm/Node.js: download package/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-npm-cd/) | [GitHub](https://github.com/pipery-dev/pipery-npm-cd) |
| Pipery Python CD | CD pipeline for Python: download package, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-python-cd/) | [GitHub](https://github.com/pipery-dev/pipery-python-cd) |
| Pipery Rust CD | CD pipeline for Rust: download binary/image, deploy (ArgoCD/Cloud Run/Helm/Ansible), check status | `v1` | [Docs](/docs/actions/cd/pipery-rust-cd/) | [GitHub](https://github.com/pipery-dev/pipery-rust-cd) |
| Pipery Terraform CD | CD pipeline for Terraform: init → plan → apply → state management and drift detection | `v3` | [Docs](/docs/actions/cd/pipery-terraform-cd/) | [GitHub](https://github.com/pipery-dev/pipery-terraform-cd) |
