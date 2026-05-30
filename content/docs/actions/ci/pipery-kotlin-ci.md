---
title: "Pipery Kotlin CI"
description: "CI pipeline for Kotlin JVM, Android, and Multiplatform projects"
type: "docs"
weight: 9
---

# Pipery Kotlin CI

- Repository: [`pipery-kotlin-ci`](https://github.com/pipery-dev/pipery-kotlin-ci)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for Kotlin projects with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-kotlin-ci@main
        with:
          project_path: .
          build_tool: auto
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| SAST | `pipery-steps` when available | `skip_sast` |
| SCA | Gradle dependencies or Maven dependency tree | `skip_sca` |
| Lint | ktlint/detekt or Maven ktlint | `skip_lint` |
| Build | Gradle or Maven | `skip_build` |
| Test | Gradle or Maven tests | `skip_test` |
| Package | JAR/WAR collection into `dist/` | `skip_packaging` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `project_path` | `.` | Kotlin project path. |
| `build_tool` | `auto` | `auto`, `gradle`, or `maven`. |
| `java_version` | `21` | Java version used by the runner. |
| `gradle_task` | `build` | Gradle build task. |
| `maven_goal` | `package` | Maven build goal. |
| `tests_path` | `` | Gradle `--tests` pattern or Maven `-Dtest` value. |
| `log_file` | `pipery.jsonl` | JSONL structured log path. |
