---
title: "Pipery Swift CI"
description: "CI pipeline for Swift Package Manager projects"
type: "docs"
weight: 11
---

# Pipery Swift CI

- Repository: [`pipery-swift-ci`](https://github.com/pipery-dev/pipery-swift-ci)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for Swift Package Manager projects with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  swift:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-swift-ci@main
        with:
          project_path: .
          configuration: release
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| Lint | SwiftLint when available | `skip_lint` |
| Build | `swift build` | `skip_build` |
| Test | `swift test` | `skip_test` |
| Package | Binary/library collection into `dist/` | `skip_packaging` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `project_path` | `.` | Swift package path. |
| `configuration` | `release` | Swift build configuration. |
| `tests_path` | `` | Optional `swift test --filter` value. |
| `log_file` | `pipery.jsonl` | JSONL structured log path. |
