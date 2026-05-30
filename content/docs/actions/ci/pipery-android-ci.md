---
title: "Pipery Android CI"
description: "CI pipeline for Android Gradle projects"
type: "docs"
weight: 10
---

# Pipery Android CI

- Repository: [`pipery-android-ci`](https://github.com/pipery-dev/pipery-android-ci)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for Android Gradle projects with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-android-ci@main
        with:
          project_path: .
          gradle_task: assembleRelease
          test_task: testReleaseUnitTest
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| SAST | `pipery-steps` when available | `skip_sast` |
| SCA | Gradle dependencies | `skip_sca` |
| Lint | Android lint | `skip_lint` |
| Build | Gradle assemble task | `skip_build` |
| Test | Gradle unit-test task | `skip_test` |
| Package | APK/AAB collection into `dist/` | `skip_packaging` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `project_path` | `.` | Android project path. |
| `java_version` | `17` | Java version used by the runner. |
| `gradle_task` | `assembleDebug` | Build task. |
| `test_task` | `testDebugUnitTest` | Test task. |
| `lint_task` | `lintDebug` | Lint task. |
| `log_file` | `pipery.jsonl` | JSONL structured log path. |
