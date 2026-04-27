---
title: "Pipery"
description: "Verified, reusable, and observable CI/CD pipelines for modern DevOps teams."
type: "landing"
---

{{< hero >}}
# Production-grade CI/CD pipelines — ship faster with confidence.

Stop rewriting fragile workflows. Use reusable, secure, observable Pipery pipelines and focus on delivering product value.

{{< buttons >}}
  {{< button href="#pipelines" primary="true" >}}
    Browse Pipelines
  {{< /button >}}
  {{< button href="#cta" >}}
    Get Started
  {{< /button >}}
{{< /buttons >}}
{{< /hero >}}

{{< section id="problem" >}}
## The Problem

CI/CD pipelines should not be this hard.

Every team ends up rebuilding the same pipelines: copy-pasted YAML, slow and flaky builds, security risks from untrusted workflows, and almost no visibility into what is actually going wrong.

You do not need another CI tool. You need better pipelines.

{{< pain-list >}}
  {{< pain-item icon="copy" >}}Copy-pasted YAML across repositories{{< /pain-item >}}
  {{< pain-item icon="clock" >}}Slow, flaky builds{{< /pain-item >}}
  {{< pain-item icon="alert" >}}Security risks from untrusted workflows{{< /pain-item >}}
  {{< pain-item icon="eye" >}}No visibility into performance or failures{{< /pain-item >}}
{{< /pain-list >}}
{{< /section >}}

{{< section id="meet-pipery" >}}
## Meet Pipery

Pipery provides production-grade, reusable CI/CD pipelines that are standardized, versioned, secure, and observable.

{{< meet >}}
  {{< meet-col label="What you get" type="features" >}}
    {{< feature icon="standard" title="Standardized" >}}Consistent pipelines across repos and teams.{{< /feature >}}
    {{< feature icon="box" title="Versioned" >}}Stable releases with predictable upgrades.{{< /feature >}}
    {{< feature icon="shield" title="Secure" >}}Reviewed and maintained to reduce workflow risk.{{< /feature >}}
    {{< feature icon="chart" title="Observable" >}}Understand performance, failures, and trends.{{< /feature >}}
  {{< /meet-col >}}
  {{< meet-col label="What teams see" type="stats" >}}
    {{< stat n="60%" l="less YAML per repo" s="Measured across migrated repos." icon="copy" >}}{{< /stat >}}
    {{< stat n="3.4×" l="faster average build" s="Better defaults, cached layers." icon="bolt" >}}{{< /stat >}}
    {{< stat n="100%" l="reviewed pipelines" s="Every release is code-reviewed." icon="shield" >}}{{< /stat >}}
    {{< stat n="v1+" l="pinned and stable" s="Semver, with predictable upgrades." icon="box" >}}{{< /stat >}}
  {{< /meet-col >}}
{{< /meet >}}
{{< /section >}}

{{< section id="how-it-works" >}}
## How it works

From YAML chaos to clean pipelines.

Replace hundreds of lines of brittle workflow logic with a single, trusted pipeline.

{{< code-compare >}}
{{< code-block language="yaml" title="Before" tag="Before · 62 lines" tagKind="before" >}}
name: Node CI/CD

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read
  id-token: write

env:
  REGISTRY: europe-west1-docker.pkg.dev
  IMAGE_NAME: pipery/api

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm test -- --ci
      - run: npm run build

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_CI_SA }}

      - uses: docker/setup-buildx-action@v3

      - run: gcloud auth configure-docker europe-west1-docker.pkg.dev

      - run: |
          docker build -t $REGISTRY/$IMAGE_NAME:${GITHUB_SHA} .
          docker push $REGISTRY/$IMAGE_NAME:${GITHUB_SHA}

  deploy:
    needs: ci
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_DEPLOY_SA }}

      - uses: google-github-actions/get-gke-credentials@v2
        with:
          cluster_name: prod-cluster
          location: europe-west1
          project_id: acme-platform-prod

      - run: |
          kubectl set image deployment/api \
            api=$REGISTRY/$IMAGE_NAME:${GITHUB_SHA} \
            --namespace production
          kubectl rollout status deployment/api --namespace production
{{< /code-block >}}

{{< code-block language="yaml" title="After" tag="After · 21 lines" tagKind="after" >}}
name: Node CI/CD

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: write
  id-token: write
  packages: write

jobs:
  ci:
    uses: pipery-dev/pipery-npm-ci@v0
    with:
      node_version: 20
      package_manager: npm
      run_lint: true
      run_tests: true
      build_command: npm run build
      publish: true
    secrets: inherit

  deploy:
    needs: ci
    if: github.ref == 'refs/heads/main'
    uses: pipery-dev/pipery-npm-cd@v0
    with:
      deploy_target: cloud-run
      service_name: api
      region: europe-west1
      project_id: acme-platform-prod
    secrets: inherit
{{< /code-block >}}
{{< /code-compare >}}
{{< /section >}}

{{< section id="features" >}}
## Features

Everything your pipelines were missing.

{{< features >}}
  {{< feature icon="puzzle" title="Reusable building blocks" >}}Use the same proven pipelines across all your repositories.{{< /feature >}}
  {{< feature icon="shield" title="Secure by default" >}}Reduce exposure to risky third-party actions and fragile workflow logic.{{< /feature >}}
  {{< feature icon="box" title="Versioned and stable" >}}Pin versions, manage upgrades cleanly, and avoid breaking changes.{{< /feature >}}
  {{< feature icon="chart" title="Built-in observability" >}}Track runtime, failures, and trends across your pipelines.{{< /feature >}}
  {{< feature icon="bolt" title="Optimized performance" >}}Ship with faster builds, better defaults, and less CI waste.{{< /feature >}}
  {{< feature icon="check" title="Verified pipelines" >}}Tested, documented, and maintained for real-world production use.{{< /feature >}}
{{< /features >}}
{{< /section >}}

{{< section id="pipelines" >}}
## Pipeline catalog

Start with the essentials.

**CI Actions**

{{< cards >}}
  {{< card title="pipery-docker-ci" href="https://github.com/pipery-dev/pipery-docker-ci" icon="/images/actions/docker.svg" >}}
    Docker CI: lint (hadolint) → SAST → SCA → build → test → version → push to registry. `pipery-dev/pipery-docker-ci@v0`
  {{< /card >}}
  {{< card title="pipery-golang-ci" href="https://github.com/pipery-dev/pipery-golang-ci" icon="/images/actions/golang.svg" >}}
    Go CI: SAST → SCA → lint (golangci-lint) → build → test → version → cross-compile → GitHub release. `pipery-dev/pipery-golang-ci@v0`
  {{< /card >}}
  {{< card title="pipery-npm-ci" href="https://github.com/pipery-dev/pipery-npm-ci" icon="/images/actions/npm.svg" >}}
    npm/Node.js CI: SAST → SCA → lint (ESLint) → build → test → version → npm publish. `pipery-dev/pipery-npm-ci@v0`
  {{< /card >}}
  {{< card title="pipery-python-ci" href="https://github.com/pipery-dev/pipery-python-ci" icon="/images/actions/python.svg" >}}
    Python CI: SAST → SCA → lint (ruff) → build → test → version → PyPI publish. `pipery-dev/pipery-python-ci@v0`
  {{< /card >}}
  {{< card title="pipery-java-ci" href="https://github.com/pipery-dev/pipery-java-ci" icon="/images/actions/java.svg" >}}
    Java CI: SAST → SCA → lint (Checkstyle) → build → test → version → package → GitHub release. Supports Maven, Gradle, Groovy. `pipery-dev/pipery-java-ci@v0`
  {{< /card >}}
  {{< card title="pipery-cpp-ci" href="https://github.com/pipery-dev/pipery-cpp-ci" icon="/images/actions/cpp.svg" >}}
    C/C++ CI: SAST → SCA → lint (clang-tidy/cppcheck) → build (CMake/Make/Meson) → test → version → package → GitHub release. `pipery-dev/pipery-cpp-ci@v0`
  {{< /card >}}
  {{< card title="pipery-rust-ci" href="https://github.com/pipery-dev/pipery-rust-ci" icon="/images/actions/rust.svg" >}}
    Rust CI: SAST → SCA → lint (clippy) → build → test → version → cargo package → GitHub release. `pipery-dev/pipery-rust-ci@v0`
  {{< /card >}}
{{< /cards >}}

**CD Actions**

{{< cards >}}
  {{< card title="pipery-docker-cd" href="https://github.com/pipery-dev/pipery-docker-cd" icon="/images/actions/docker.svg" >}}
    Docker CD: pull image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-docker-cd@v0`
  {{< /card >}}
  {{< card title="pipery-golang-cd" href="https://github.com/pipery-dev/pipery-golang-cd" icon="/images/actions/golang.svg" >}}
    Go CD: download artifact/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-golang-cd@v0`
  {{< /card >}}
  {{< card title="pipery-npm-cd" href="https://github.com/pipery-dev/pipery-npm-cd" icon="/images/actions/npm.svg" >}}
    npm/Node.js CD: download package/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-npm-cd@v0`
  {{< /card >}}
  {{< card title="pipery-python-cd" href="https://github.com/pipery-dev/pipery-python-cd" icon="/images/actions/python.svg" >}}
    Python CD: download package/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-python-cd@v0`
  {{< /card >}}
  {{< card title="pipery-java-cd" href="https://github.com/pipery-dev/pipery-java-cd" icon="/images/actions/java.svg" >}}
    Java CD: download artifact/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-java-cd@v0`
  {{< /card >}}
  {{< card title="pipery-cpp-cd" href="https://github.com/pipery-dev/pipery-cpp-cd" icon="/images/actions/cpp.svg" >}}
    C/C++ CD: download artifact/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-cpp-cd@v0`
  {{< /card >}}
  {{< card title="pipery-rust-cd" href="https://github.com/pipery-dev/pipery-rust-cd" icon="/images/actions/rust.svg" >}}
    Rust CD: download artifact/image → deploy (ArgoCD/Cloud Run/Helm/Ansible) → status check. `pipery-dev/pipery-rust-cd@v0`
  {{< /card >}}
{{< /cards >}}
{{< /section >}}

{{< section id="built-for-teams" >}}
## Built for real-world teams

Built for the teams tired of rewriting pipelines.

Pipery is designed for startups and platform teams that want faster, safer, and more maintainable CI/CD without rebuilding the same workflows over and over again.
{{< /section >}}

{{< cta id="cta" >}}
## Get started

Stop maintaining pipelines.

Start shipping faster with Pipery.

{{< buttons >}}
  {{< button href="https://github.com/pipery-dev" primary="true" >}}
    Get started for free
  {{< /button >}}
  {{< button href="mailto:hello@pipery.dev" >}}
    Talk to us
  {{< /button >}}
{{< /buttons >}}
{{< /cta >}}
