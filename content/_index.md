---
title: "Pipery"
description: "Verified, reusable, and observable CI/CD pipelines for GitHub Actions, with structured psh logs, replayable pipery.jsonl output, and a dashboard for debugging workflow runs."
type: "landing"
keywords:
  - CI/CD pipelines
  - GitHub Actions
  - DevOps automation
  - pipeline observability
  - structured CI logs
  - pipery.jsonl
  - psh
  - Pipery Dashboard
sitemap:
  priority: 1.0
  changefreq: weekly
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
<h2>The Problem</h2>

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
<h2>Meet Pipery</h2>

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
<h2>How it works</h2>

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
    uses: pipery-dev/pipery-cloudrun-cd@v0
    with:
      image_name: api
      region: europe-west1
      project_id: acme-platform-prod
    secrets: inherit
{{< /code-block >}}
{{< /code-compare >}}
{{< /section >}}

{{< section id="observability" >}}
<h2>Observe and replay every step</h2>

Pipery workflows run task scripts through `psh`, the Pipery Shell. Instead of asking every pipeline author to hand-write logging, `psh` observes each command as it runs and writes structured events to `pipery.jsonl`.

{{< features >}}
  {{< feature icon="clock" title="Timing and runtime context" >}}Each logged command carries timing, working directory, runner context, environment details, arguments, exit status, and captured output.{{< /feature >}}
  {{< feature icon="eye" title="Structured pipeline history" >}}`pipery.jsonl` is line-delimited JSON, so it can be uploaded as a GitHub Actions artifact, searched in the dashboard, or inspected locally with ordinary CLI tools.{{< /feature >}}
  {{< feature icon="bolt" title="Replay for debugging" >}}Because the log records what ran and how it ran, Pipery can replay the captured execution path so a developer can reproduce a failing step with the same command shape.{{< /feature >}}
{{< /features >}}

{{< code-block language="json" title="pipery.jsonl" tag="Replayable execution log" tagKind="after" >}}
{"timestamp":"2026-04-29T10:21:18.492351Z","started_at":"2026-04-29T10:21:15.083104Z","finished_at":"2026-04-29T10:21:18.492351Z","duration":"3.409247s","duration_ms":3409,"system_cpu_cores":4,"system_memory_bytes":17179869184,"process_user_cpu_ms":812,"process_system_cpu_ms":143,"process_max_rss_bytes":73400320,"mode":"shell","builtin":false,"command":"/bin/bash","args":["-lc","docker build -t ghcr.io/acme/api:sha-abc123 ."],"raw_command":"docker build -t ghcr.io/acme/api:sha-abc123 .","before_cwd":"/github/workspace","cwd":"/github/workspace","before_env":["GITHUB_ACTIONS=true","RUNNER_OS=Linux"],"env":["GITHUB_ACTIONS=true","RUNNER_OS=Linux"],"stdin":"","stdout":"Successfully built image\\n","stderr":"","exit_code":0,"pid":12842}
{"timestamp":"2026-04-29T10:22:07.819604Z","started_at":"2026-04-29T10:22:04.112008Z","finished_at":"2026-04-29T10:22:07.819604Z","duration":"3.707596s","duration_ms":3707,"system_cpu_cores":4,"system_memory_bytes":17179869184,"process_user_cpu_ms":1204,"process_system_cpu_ms":196,"process_max_rss_bytes":104857600,"mode":"shell","builtin":false,"command":"/bin/bash","args":["-lc","npm test -- --ci"],"raw_command":"npm test -- --ci","before_cwd":"/github/workspace","cwd":"/github/workspace","before_env":["GITHUB_ACTIONS=true","RUNNER_OS=Linux"],"env":["GITHUB_ACTIONS=true","RUNNER_OS=Linux"],"stdin":"","stdout":"","stderr":"1 failing test\\n","exit_code":1,"pid":12911}
{{< /code-block >}}
{{< /section >}}

{{< section id="dashboard" >}}
<h2>Pipery Dashboard</h2>

Pipery Dashboard turns raw pipeline logs into a searchable debugging workspace. Open a workflow run, inspect the `pipery.jsonl` timeline, and move from “the build failed” to the exact command, output, timing, and context that explain why.

{{< buttons >}}
  {{< button href="https://dash.pipery.dev" primary="true" >}}
    Open Dashboard
  {{< /button >}}
  {{< button href="https://github.com/pipery-dev/pipery-dashboard" >}}
    View Source
  {{< /button >}}
{{< /buttons >}}

{{< features >}}
  {{< feature icon="eye" title="Find the run that matters" >}}Browse recent workflow runs and open their Pipery logs without digging through downloaded artifacts by hand.{{< /feature >}}
  {{< feature icon="standard" title="Search command history" >}}Filter entries by command, output, status, timing, or environment context so the noisy parts of CI stay out of the way.{{< /feature >}}
  {{< feature icon="box" title="Keep useful logs close" >}}Reopen recent logs for offline review, compare what changed between runs, and share a clearer failure story with the team.{{< /feature >}}
{{< /features >}}

{{< cards >}}
  {{< card title="Local-first by design" href="https://dash.pipery.dev" icon="/images/actions/pipery-docker-ci.svg" >}}
    Logs you open stay available for quick follow-up, even when you need to revisit a failure after the build page has gone cold.
  {{< /card >}}
  {{< card title="Private repo aware" href="https://dash.pipery.dev" icon="/images/actions/pipery-golang-ci.svg" >}}
    Teams can inspect the same private workflow runs they already have access to, without copying logs into a separate system.
  {{< /card >}}
  {{< card title="Browser and terminal friendly" href="https://dash.pipery.dev" icon="/images/actions/pipery-npm-ci.svg" >}}
    Use the dashboard for visual inspection, or the CLI when you want the same log-browsing flow from a terminal.
  {{< /card >}}
{{< /cards >}}
{{< /section >}}

{{< section id="features" >}}
<h2>Features</h2>

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
<h2>Pipeline catalog</h2>

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
  {{< card title="pipery-terraform-ci" href="https://github.com/pipery-dev/pipery-terraform-ci" icon="/images/actions/terraform.svg" >}}
    Terraform CI: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release. `pipery-dev/pipery-terraform-ci@v0`
  {{< /card >}}
{{< /cards >}}

**CD Actions**

{{< cards >}}
  {{< card title="pipery-argocd-cd" href="https://github.com/pipery-dev/pipery-argocd-cd" icon="/images/actions/argocd.svg" >}}
    ArgoCD CD: update image tag & values → ArgoCD sync → wait for Argo Rollout. GitOps-native deployment. `pipery-dev/pipery-argocd-cd@v0`
  {{< /card >}}
  {{< card title="pipery-helm-cd" href="https://github.com/pipery-dev/pipery-helm-cd" icon="/images/actions/helm.svg" >}}
    Helm CD: update chart values → helm upgrade → wait for rollout. Deploy any workload via Helm. `pipery-dev/pipery-helm-cd@v0`
  {{< /card >}}
  {{< card title="pipery-cloudrun-cd" href="https://github.com/pipery-dev/pipery-cloudrun-cd" icon="/images/actions/cloudrun.svg" >}}
    Cloud Run CD: push image → gcloud run deploy → manage traffic migration and health checks. Deploy to Google Cloud Run. `pipery-dev/pipery-cloudrun-cd@v0`
  {{< /card >}}
  {{< card title="pipery-ansible-cd" href="https://github.com/pipery-dev/pipery-ansible-cd" icon="/images/actions/ansible.svg" >}}
    Ansible CD: clone playbook repo, install pip requirements, run playbook → status check. Deploy to VMs or bare metal. `pipery-dev/pipery-ansible-cd@v0`
  {{< /card >}}
  {{< card title="pipery-docker-cd" href="https://github.com/pipery-dev/pipery-docker-cd" icon="/images/actions/docker.svg" >}}
    Docker CD: docker-compose up or docker swarm deploy → health check. Deploy containerized workloads directly. `pipery-dev/pipery-docker-cd@v0`
  {{< /card >}}
  {{< card title="pipery-terraform-cd" href="https://github.com/pipery-dev/pipery-terraform-cd" icon="/images/actions/terraform.svg" >}}
    Terraform CD: terraform plan → terraform apply → state management and drift detection. Infrastructure as code deployment. `pipery-dev/pipery-terraform-cd@v0`
  {{< /card >}}
{{< /cards >}}
{{< /section >}}

{{< section id="guides" >}}
<h2>Start with a guide</h2>

If you want a faster path than reading every README, start with one of these action-specific guides. Each one shows the workflow shape, the inputs that matter first, and where Pipery observability helps when a run fails.

{{< cards >}}
  {{< card title="Start with npm CI" href="/post/getting-started-with-pipery-npm-ci/" icon="/images/actions/npm.svg" >}}
    Set up a reusable Node.js pipeline for scanning, linting, testing, packaging, and npm release.
  {{< /card >}}
  {{< card title="Start with Python CI" href="/post/getting-started-with-pipery-python-ci/" icon="/images/actions/python.svg" >}}
    Adopt a Python pipeline covering Bandit, Ruff, pytest, packaging, and PyPI release.
  {{< /card >}}
  {{< card title="Start with Docker CI" href="/post/getting-started-with-pipery-docker-ci/" icon="/images/actions/docker.svg" >}}
    Standardize container build, scan, smoke test, tag, and registry push workflows.
  {{< /card >}}
  {{< card title="Start with Terraform CI" href="/post/getting-started-with-pipery-terraform-ci/" icon="/images/actions/terraform.svg" >}}
    Add validation and plan checks to infrastructure repos without rebuilding the workflow by hand.
  {{< /card >}}
  {{< card title="Deploy with Cloud Run CD" href="/post/deploying-to-cloud-run-with-pipery-cloudrun-cd/" icon="/images/actions/cloudrun.svg" >}}
    Ship a built image to Cloud Run with reusable deploy, traffic migration, and status checks.
  {{< /card >}}
{{< /cards >}}
{{< /section >}}

{{< section id="built-for-teams" >}}
<h2>Built for real-world teams</h2>

Built for the teams tired of rewriting pipelines.

Pipery is designed for startups and platform teams that want faster, safer, and more maintainable CI/CD without rebuilding the same workflows over and over again.
{{< /section >}}

{{< cta id="cta" >}}
<h2>Get started</h2>

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
