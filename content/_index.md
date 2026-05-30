---
title: "Pipery"
description: "Define CI/CD once and run reusable, observable delivery workflows across platforms like GitHub Actions, GitLab CI, and Bitbucket Pipelines."
type: "landing"
keywords:
  - CI/CD pipelines
  - GitHub Actions
  - GitLab CI
  - Bitbucket Pipelines
  - Bitbucket Cloud
  - vendor-neutral CI/CD
  - CI/CD abstraction
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
# Define your pipelines once. Run them across platforms.

Pipery is a vendor-neutral CI/CD standardization layer for reusable delivery workflows. Start with GitHub Actions, run the same delivery logic on GitLab CI or Bitbucket Pipelines, and keep your pipelines portable as your platform changes.

{{< buttons >}}
  {{< button href="/catalog/" primary="true" >}}
    Browse Pipelines
  {{< /button >}}
  {{< button href="https://start.pipery.dev" >}}
    Get Started
  {{< /button >}}
{{< /buttons >}}
{{< /hero >}}

{{< section id="introduction" class="video-section" >}}
<h2>Watch Pipery in action</h2>

See how Pipery turns reusable GitHub Actions, GitLab CI, and Bitbucket Pipelines workflows, structured `psh` logs, and replayable `pipery.jsonl` output into a clearer CI/CD workflow.

{{< youtube-intro id="ZdAa6235pA8" title="Pipery platform introduction" thumbnail="/images/pipery-introduction-thumbnail.png" >}}
{{< /section >}}

{{< section id="problem" >}}
<h2>The Problem</h2>

CI/CD pipelines should not be this hard.

Every team ends up rebuilding the same pipelines: copy-pasted YAML, slow and flaky builds, security risks from untrusted workflows, vendor-specific delivery logic, and almost no visibility into what is actually going wrong.

You do not need another CI tool. You need portable delivery logic.

{{< pain-list >}}
  {{< pain-item icon="copy" >}}Copy-pasted YAML across repositories{{< /pain-item >}}
  {{< pain-item icon="puzzle" >}}Pipeline logic tied to one CI vendor{{< /pain-item >}}
  {{< pain-item icon="clock" >}}Slow, flaky builds{{< /pain-item >}}
  {{< pain-item icon="alert" >}}Security risks from untrusted workflows{{< /pain-item >}}
  {{< pain-item icon="eye" >}}No visibility into performance or failures{{< /pain-item >}}
{{< /pain-list >}}
{{< /section >}}

{{< section id="meet-pipery" >}}
<h2>Meet Pipery</h2>

Pipery lets teams define CI/CD once and run it across platforms like GitHub Actions, GitLab CI, and Bitbucket Pipelines.

It provides production-grade, reusable CI/CD pipelines that are standardized, versioned, secure, observable, and designed to reduce CI/CD vendor lock-in.

{{< meet >}}
  {{< meet-col label="What you get" type="features" >}}
    {{< feature icon="standard" title="Standardized" >}}Consistent pipelines across repos, teams, and CI platforms.{{< /feature >}}
    {{< feature icon="box" title="Versioned" >}}Stable releases with predictable upgrades.{{< /feature >}}
    {{< feature icon="shield" title="Secure" >}}Reviewed and maintained to reduce workflow risk.{{< /feature >}}
    {{< feature icon="chart" title="Portable" >}}Move delivery logic across vendors without starting from blank YAML.{{< /feature >}}
  {{< /meet-col >}}
  {{< meet-col label="What teams see" type="stats" >}}
    {{< stat n="60%" l="less YAML per repo" s="Measured across migrated repos." icon="copy" >}}{{< /stat >}}
    {{< stat n="3.4×" l="faster average build" s="Better defaults, cached layers." icon="bolt" >}}{{< /stat >}}
    {{< stat n="100%" l="reviewed pipelines" s="Every release is code-reviewed." icon="shield" >}}{{< /stat >}}
    {{< stat n="v1.1.0" l="latest action release" s="Semver, with predictable upgrades." icon="box" >}}{{< /stat >}}
  {{< /meet-col >}}
{{< /meet >}}
{{< /section >}}

{{< section id="latest-release" >}}
<h2>Latest release: v1.1.0</h2>

The current Pipery action release is `v1.1.0` across the supported CI and CD action catalog. This release focuses on portability, release safety, and GitOps handoff: Go and C/C++ actions support cross-platform compilation, action scenario tests run before release, and the ArgoCD CD action can validate Helm charts before publishing deployment updates.

{{< features >}}
  {{< feature icon="box" title="Pinned action versions" >}}Use exact `v1.1.0` tags in GitHub Actions, GitLab CI includes, and Bitbucket shared pipeline imports when you want fully reproducible adoption.{{< /feature >}}
  {{< feature icon="standard" title="Cross-platform builds" >}}Go and C/C++ CI can build release artifacts for Linux amd64, Linux arm64, Windows amd64, and Darwin amd64 targets.{{< /feature >}}
  {{< feature icon="check" title="Release-tested actions" >}}Each action repository keeps runnable test projects and scenario coverage so workflow changes are tested before a new release is published.{{< /feature >}}
  {{< feature icon="chart" title="GitOps deployment updates" >}}`pipery-argocd-cd@v1.1.0` can validate Helm dependencies, lint charts, render templates, and publish values-driven ArgoCD updates.{{< /feature >}}
{{< /features >}}

{{< buttons >}}
  {{< button href="/docs/releases/v1-1/" primary="true" >}}
    Read v1.1.0 Notes
  {{< /button >}}
  {{< button href="/catalog/" >}}
    Browse v1.1.0 Catalog
  {{< /button >}}
{{< /buttons >}}
{{< /section >}}

{{< section id="vendor-neutral" >}}
<h2>Vendor-neutral by design</h2>

Your delivery logic should not be trapped inside one CI vendor.

Pipery is moving CI/CD from provider-specific workflow files toward reusable delivery standards. Use the same Pipery pipeline family from GitHub Actions, GitLab CI, or Bitbucket Pipelines today, and keep a path open for future platforms like CircleCI, Jenkins, and Azure DevOps.

{{< features >}}
  {{< feature icon="puzzle" title="Define once" >}}Standardize the build, scan, package, release, and deploy flow as Pipery pipeline logic instead of rewriting it per repository.{{< /feature >}}
  {{< feature icon="standard" title="Run across platforms" >}}Generate GitHub Actions workflows, GitLab CI YAML, or Bitbucket Pipelines YAML from the same catalog of CI and CD building blocks.{{< /feature >}}
  {{< feature icon="bolt" title="Switch with less rewrite" >}}When teams move between GitHub, GitLab, or future providers, the delivery model stays familiar.{{< /feature >}}
  {{< feature icon="chart" title="Keep observability" >}}`psh` and `pipery.jsonl` give every supported backend the same structured debugging trail.{{< /feature >}}
{{< /features >}}
{{< /section >}}

{{< section id="automation-bots" >}}
<h2>Release and deploy bots for GitHub</h2>

Pipery also includes GitHub App services for the parts of delivery that should be deliberate: creating release branches, tagging releases, and scheduling one-time deploys with a clear audit trail.

{{< features >}}
  {{< feature icon="shield" title="pipery-release-bot" >}}Create configured `release/*` branches through a GitHub App, optionally tag them, and publish GitHub Releases from markdown release notes stored in the repository.{{< /feature >}}
  {{< feature icon="clock" title="pipery-deploy-bot" >}}Schedule a one-time deploy from a workflow, trigger the selected GitHub Actions job at the requested time, and track attempts in Postgres with a dashboard.{{< /feature >}}
  {{< feature icon="chart" title="Dex and ArgoCD handoff" >}}Bots validate Dex-issued tokens, ship Helm charts, and publish ArgoCD Application updates into the private `pipery-argocd` repository on every release.{{< /feature >}}
{{< /features >}}

{{< buttons >}}
  {{< button href="/docs/bots/pipery-release-bot/" primary="true" >}}
    Release Bot Docs
  {{< /button >}}
  {{< button href="/docs/bots/pipery-deploy-bot/" >}}
    Deploy Bot Docs
  {{< /button >}}
{{< /buttons >}}
{{< /section >}}

{{< section id="how-it-works" >}}
<h2>How it works</h2>

From YAML chaos to clean pipelines.

Replace hundreds of lines of brittle vendor-specific workflow logic with a single, trusted pipeline. Pick a platform to see the before and after.

<div class="platform-compare">
  <input class="platform-compare__radio" type="radio" name="platform-compare" id="platform-github" checked>
  <input class="platform-compare__radio" type="radio" name="platform-compare" id="platform-gitlab">
  <input class="platform-compare__radio" type="radio" name="platform-compare" id="platform-bitbucket">

  <div class="platform-tabs" aria-label="Pipeline platform examples">
    <label class="platform-tab platform-tab--github" for="platform-github">
      <i class="icon github sri" aria-hidden="true"></i>
      <span>GitHub Actions</span>
    </label>
    <label class="platform-tab platform-tab--gitlab" for="platform-gitlab">
      <i class="icon gitlab sri" aria-hidden="true"></i>
      <span>GitLab CI</span>
    </label>
    <label class="platform-tab platform-tab--bitbucket" for="platform-bitbucket">
      <i class="icon bitbucket sri" aria-hidden="true"></i>
      <span>Bitbucket Cloud</span>
    </label>
    <a class="platform-tabs__link platform-tabs__link--github" href="https://github.com/pipery-dev">View on GitHub</a>
    <a class="platform-tabs__link platform-tabs__link--gitlab" href="https://gitlab.com/pipery-dev">View on GitLab</a>
    <a class="platform-tabs__link platform-tabs__link--bitbucket" href="https://bitbucket.org/pipery-dev">View on Bitbucket</a>
  </div>

  <div class="platform-panel platform-panel--github">
{{< code-compare >}}
{{< code-block language="yaml" title="Before · GitHub Actions" tag="Before · 62 lines" tagKind="before" >}}
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
    uses: pipery-dev/npm-ci@v1.1.0
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
    uses: pipery-dev/cloudrun-cd@v1.1.0
    with:
      image_name: api
      region: europe-west1
      project_id: acme-platform-prod
    secrets: inherit
{{< /code-block >}}
{{< /code-compare >}}
  </div>

  <div class="platform-panel platform-panel--gitlab">
{{< code-compare >}}
{{< code-block language="yaml" title="Before · GitLab CI" tag="Before · vendor YAML" tagKind="before" >}}
stages:
  - test
  - build
  - deploy

variables:
  IMAGE_NAME: pipery/api
  REGISTRY: registry.gitlab.com/acme/platform

npm_test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm run lint
    - npm test -- --ci
    - npm run build

docker_build:
  stage: build
  image: docker:27
  services:
    - docker:27-dind
  script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
    - docker build -t "$REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHA" .
    - docker push "$REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHA"

deploy:
  stage: deploy
  image: google/cloud-sdk:slim
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
  script:
    - gcloud auth activate-service-account --key-file "$GCP_SERVICE_ACCOUNT_KEY"
    - kubectl set image deployment/api api="$REGISTRY/$IMAGE_NAME:$CI_COMMIT_SHA" --namespace production
    - kubectl rollout status deployment/api --namespace production
{{< /code-block >}}

{{< code-block language="yaml" title="After · GitLab CI" tag="After · Pipery templates" tagKind="after" >}}
include:
  - project: pipery-dev/npm-ci
    ref: v1.1.0
    file: /.gitlab-ci.yml
  - project: pipery-dev/cloudrun-cd
    ref: v1.1.0
    file: /.gitlab-ci.yml

stages:
  - ci
  - cd

variables:
  PIPERY_PROJECT_PATH: .
  PIPERY_NODE_VERSION: "20"
  PIPERY_RUN_LINT: "true"
  PIPERY_RUN_TESTS: "true"
  PIPERY_BUILD_COMMAND: npm run build
  PIPERY_IMAGE_NAME: api
  PIPERY_REGION: europe-west1
  PIPERY_PROJECT_ID: acme-platform-prod

pipery_npm_ci:
  stage: ci
  extends: .pipery_npm_ci

pipery_cloudrun_cd:
  stage: cd
  extends: .pipery_cloudrun_cd
  needs:
    - pipery_npm_ci
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
{{< /code-block >}}
{{< /code-compare >}}
  </div>

  <div class="platform-panel platform-panel--bitbucket">
{{< code-compare >}}
{{< code-block language="yaml" title="Before · Bitbucket Pipelines" tag="Before · vendor YAML" tagKind="before" >}}
image: node:20

definitions:
  services:
    docker:
      memory: 2048

pipelines:
  branches:
    main:
      - step:
          name: Test and build
          caches:
            - node
          script:
            - npm ci
            - npm run lint
            - npm test -- --ci
            - npm run build
      - step:
          name: Build image
          services:
            - docker
          script:
            - docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" "$REGISTRY"
            - docker build -t "$REGISTRY/pipery/api:$BITBUCKET_COMMIT" .
            - docker push "$REGISTRY/pipery/api:$BITBUCKET_COMMIT"
      - step:
          name: Deploy
          deployment: production
          script:
            - gcloud auth activate-service-account --key-file "$GCP_SERVICE_ACCOUNT_KEY"
            - kubectl set image deployment/api api="$REGISTRY/pipery/api:$BITBUCKET_COMMIT" --namespace production
            - kubectl rollout status deployment/api --namespace production
{{< /code-block >}}

{{< code-block language="yaml" title="After · Bitbucket Pipelines" tag="After · Pipery pipeline" tagKind="after" >}}
# Pipery shared pipeline repository in the same Bitbucket workspace:
# https://bitbucket.org/pipery-dev/npm-ci/
export: true

definitions:
  pipelines:
    pipery-npm-to-cloudrun:
      - step:
          name: Setup npm Environment
          image: node:20-alpine
          caches:
            - node
          script:
            - cd ${PROJECT_PATH:-.}
            - npm ci
      - parallel:
          - step:
              name: SAST Security Scan
              image: python:3.11-alpine
              script:
                - pip install --quiet pipery-tooling
                - pipery-tooling sast --project-path ${PROJECT_PATH:-.} --log-file ${LOG_FILE:-pipery.jsonl}
          - step:
              name: SCA Security Scan
              image: python:3.11-alpine
              script:
                - pip install --quiet pipery-tooling
                - pipery-tooling sca --project-path ${PROJECT_PATH:-.} --log-file ${LOG_FILE:-pipery.jsonl}
      - step:
          name: Build Application
          image: node:20-alpine
          script:
            - cd ${PROJECT_PATH:-.}
            - npm run build
      - step:
          name: Deploy to Cloud Run
          image: google/cloud-sdk:alpine
          script:
            - pipery-cloudrun deploy
      - step:
          name: Publish Pipery Logs
          script:
            - test -f ${LOG_FILE:-pipery.jsonl} && tail -n 20 ${LOG_FILE:-pipery.jsonl} || true

---
# Application repository:
# bitbucket-pipelines.yml
definitions:
  imports:
    pipery-npm-ci: pipery-dev/npm-ci:v1.1.0
    pipery-cloudrun-cd: pipery-dev/cloudrun-cd:v1.1.0:.bitbucket/shared-pipelines.yml

pipelines:
  branches:
    main:
      import: pipery-npm-ci@pipery-npm-ci

  custom:
    deploy-cloudrun:
      import: pipery-cloudrun-cd@pipery-cloudrun-cd
{{< /code-block >}}
{{< /code-compare >}}
  </div>
</div>
{{< /section >}}

{{< section id="observability" >}}
<h2>Observe and replay every step</h2>

Pipery workflows run task scripts through `psh`, the Pipery Shell. Instead of asking every pipeline author to hand-write logging, `psh` observes each command as it runs and writes structured events to `pipery.jsonl`.

{{< features >}}
  {{< feature icon="clock" title="Timing and runtime context" >}}Each logged command carries timing, working directory, runner context, environment details, arguments, exit status, and captured output.{{< /feature >}}
  {{< feature icon="eye" title="Structured pipeline history" >}}`pipery.jsonl` is line-delimited JSON, so it can be uploaded as a workflow artifact, searched in the dashboard, or inspected locally with ordinary CLI tools.{{< /feature >}}
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
  {{< button href="https://github.com/pipery-dev/dashboard" >}}
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
  {{< feature icon="puzzle" title="Reusable building blocks" >}}Use the same proven pipelines across repositories and CI providers.{{< /feature >}}
  {{< feature icon="shield" title="Secure by default" >}}Reduce exposure to risky third-party actions and fragile workflow logic.{{< /feature >}}
  {{< feature icon="box" title="Versioned and stable" >}}Pin versions, manage upgrades cleanly, and avoid breaking changes.{{< /feature >}}
  {{< feature icon="chart" title="Built-in observability" >}}Track runtime, failures, and trends across your pipelines.{{< /feature >}}
  {{< feature icon="bolt" title="Optimized performance" >}}Ship with faster builds, better defaults, and less CI waste.{{< /feature >}}
  {{< feature icon="check" title="Multi-platform support" >}}GitHub Actions, GitLab CI, and Bitbucket Pipelines are supported now, with more CI ecosystems on the roadmap.{{< /feature >}}
{{< /features >}}
{{< /section >}}

{{< section id="pipelines" >}}
<h2>Pipeline catalog</h2>

Start with the essentials.

**CI Actions**

{{< cards >}}
  {{< card title="pipery-docker-ci" href="https://github.com/pipery-dev/docker-ci" icon="/images/actions/docker.svg" >}}
    Docker CI: lint (hadolint) → SAST → SCA → build → test → version → push to registry. `pipery-dev/docker-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-golang-ci" href="https://github.com/pipery-dev/golang-ci" icon="/images/actions/golang.svg" >}}
    Go CI: SAST → SCA → lint (golangci-lint) → build → test → version → cross-compile → GitHub release. `pipery-dev/golang-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-npm-ci" href="https://github.com/pipery-dev/npm-ci" icon="/images/actions/npm.svg" >}}
    npm/Node.js CI: SAST → SCA → lint (ESLint) → build → test → version → npm publish. `pipery-dev/npm-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-python-ci" href="https://github.com/pipery-dev/python-ci" icon="/images/actions/python.svg" >}}
    Python CI: SAST → SCA → lint (ruff) → build → test → version → PyPI publish. `pipery-dev/python-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-java-ci" href="https://github.com/pipery-dev/java-ci" icon="/images/actions/java.svg" >}}
    Java CI: SAST → SCA → lint (Checkstyle) → build → test → version → package → GitHub release. Supports Maven, Gradle, Ant, and Groovy. `pipery-dev/java-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-kotlin-ci" href="https://github.com/pipery-dev/pipery-kotlin-ci" icon="/images/actions/java.svg" >}}
    Kotlin CI: SAST → SCA → lint → Gradle/Maven build → test → package. Supports JVM, Android, and Multiplatform projects. `pipery-dev/pipery-kotlin-ci@main`
  {{< /card >}}
  {{< card title="pipery-android-ci" href="https://github.com/pipery-dev/pipery-android-ci" icon="/images/actions/java.svg" >}}
    Android CI: SAST → SCA → lint → assemble → test → package APK/AAB artifacts. `pipery-dev/pipery-android-ci@main`
  {{< /card >}}
  {{< card title="pipery-swift-ci" href="https://github.com/pipery-dev/pipery-swift-ci" icon="/images/pipeline.svg" >}}
    Swift CI: SwiftLint → SwiftPM build → test → package → release-ready artifacts. `pipery-dev/pipery-swift-ci@main`
  {{< /card >}}
  {{< card title="pipery-ios-ci" href="https://github.com/pipery-dev/pipery-ios-ci" icon="/images/pipeline.svg" >}}
    iOS CI: SwiftLint → xcodebuild build → test → archive → export IPA artifacts. `pipery-dev/pipery-ios-ci@main`
  {{< /card >}}
  {{< card title="pipery-cpp-ci" href="https://github.com/pipery-dev/cpp-ci" icon="/images/actions/cpp.svg" >}}
    C/C++ CI: SAST → SCA → lint (clang-tidy/cppcheck) → build (CMake/Make/Meson) → test → version → package → GitHub release. `pipery-dev/cpp-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-rust-ci" href="https://github.com/pipery-dev/rust-ci" icon="/images/actions/rust.svg" >}}
    Rust CI: SAST → SCA → lint (clippy) → build → test → version → cargo package → GitHub release. `pipery-dev/rust-ci@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-terraform-ci" href="https://github.com/pipery-dev/terraform-ci" icon="/images/actions/terraform.svg" >}}
    Terraform CI: SAST (tfsec) → SCA → lint (tflint) → validate → plan → version → release. `pipery-dev/terraform-ci@v1.1.0`
  {{< /card >}}
{{< /cards >}}

**CD Actions**

{{< cards >}}
  {{< card title="pipery-argocd-cd" href="https://github.com/pipery-dev/argocd-cd" icon="/images/actions/argocd.svg" >}}
    ArgoCD CD: update image tag & values → ArgoCD sync → wait for Argo Rollout. GitOps-native deployment. `pipery-dev/argocd-cd@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-helm-cd" href="https://github.com/pipery-dev/helm-cd" icon="/images/actions/helm.svg" >}}
    Helm CD: update chart values → helm upgrade → wait for rollout. Deploy any workload via Helm. `pipery-dev/helm-cd@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-cloudrun-cd" href="https://github.com/pipery-dev/cloudrun-cd" icon="/images/actions/cloudrun.svg" >}}
    Cloud Run CD: push image → gcloud run deploy → manage traffic migration and health checks. Deploy to Google Cloud Run. `pipery-dev/cloudrun-cd@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-googleplay-cd" href="https://github.com/pipery-dev/pipery-googleplay-cd" icon="/images/actions/java.svg" >}}
    Google Play CD: upload Android APK/AAB artifacts with Fastlane supply or Gradle Play Publisher. `pipery-dev/pipery-googleplay-cd@main`
  {{< /card >}}
  {{< card title="pipery-appstore-cd" href="https://github.com/pipery-dev/pipery-appstore-cd" icon="/images/pipeline.svg" >}}
    App Store CD: upload iOS IPA artifacts to App Store Connect with Fastlane pilot or xcrun altool. `pipery-dev/pipery-appstore-cd@main`
  {{< /card >}}
  {{< card title="pipery-ansible-cd" href="https://github.com/pipery-dev/ansible-cd" icon="/images/actions/ansible.svg" >}}
    Ansible CD: clone playbook repo, install pip requirements, run playbook → status check. Deploy to VMs or bare metal. `pipery-dev/ansible-cd@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-docker-cd" href="https://github.com/pipery-dev/docker-cd" icon="/images/actions/docker.svg" >}}
    Docker CD: docker-compose up or docker swarm deploy → health check. Deploy containerized workloads directly. `pipery-dev/docker-cd@v1.1.0`
  {{< /card >}}
  {{< card title="pipery-terraform-cd" href="https://github.com/pipery-dev/terraform-cd" icon="/images/actions/terraform.svg" >}}
    Terraform CD: terraform plan → terraform apply → state management and drift detection. Infrastructure as code deployment. `pipery-dev/terraform-cd@v1.1.0`
  {{< /card >}}
{{< /cards >}}
{{< /section >}}

{{< section id="guides" >}}
<h2>Start with a guide</h2>

If you want a faster path than reading every README, start with one of these action-specific guides. Each one shows the workflow shape, the inputs that matter first, and where Pipery observability helps when a run fails.

{{< cards >}}
  {{< card title="Run Pipery on GitLab" href="/post/running-pipery-on-gitlab-ci/" icon="/images/pipeline.svg" >}}
    Use GitLab mirror repositories, remote includes, protected variables, and pipery.jsonl artifacts.
  {{< /card >}}
  {{< card title="Run Pipery on Bitbucket" href="/post/running-pipery-on-bitbucket-pipelines/" icon="/images/pipeline.svg" >}}
    Adopt Bitbucket Pipelines with shared imports, repository variables, artifacts, and dashboard links.
  {{< /card >}}
  {{< card title="New cross-platform features" href="/post/new-cross-platform-features-in-pipery/" icon="/images/pipeline.svg" >}}
    Review the mirror, template, skip flag, artifact, and dashboard changes across Pipery pipelines.
  {{< /card >}}
  {{< card title="What changed in v1.1.0" href="/post/pipery-1-1-release/" icon="/images/pipeline.svg" >}}
    See the latest action versions, cross-platform build work, ArgoCD chart publishing, and release-test coverage.
  {{< /card >}}
  {{< card title="Use Dex for Pipery auth" href="/post/dex-auth-for-pipery-apps/" icon="/images/actions/argocd.svg" >}}
    Configure one Dex issuer for bots while dashboard and workflow-gen keep provider OAuth tokens for API work.
  {{< /card >}}
  {{< card title="Schedule one-time deploys" href="/post/scheduling-one-time-deploys/" icon="/images/actions/helm.svg" >}}
    Use pipery-deploy-bot when a deployment has a fixed release window but should not be a recurring cron.
  {{< /card >}}
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

Built for teams tired of rewriting pipelines every time repositories, standards, or vendors change.

Pipery is designed for startups and platform teams that want faster, safer, and more maintainable CI/CD without rebuilding the same workflows over and over again. It gives platform engineering teams a practical delivery portability layer today, without requiring a heavy custom DSL before the value is obvious.
{{< /section >}}

{{< cta id="cta" >}}
<h2>Get started</h2>

Stop maintaining vendor-specific pipelines.

Start shipping faster with Pipery.

{{< buttons >}}
  {{< button href="https://start.pipery.dev" primary="true" >}}
    Get started for free
  {{< /button >}}
  {{< button href="/contact/" >}}
    Contact us
  {{< /button >}}
{{< /buttons >}}
{{< /cta >}}
