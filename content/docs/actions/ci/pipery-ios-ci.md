---
title: "Pipery iOS CI"
description: "CI pipeline for iOS Xcode projects"
type: "docs"
weight: 12
---

# Pipery iOS CI

- Repository: [`pipery-ios-ci`](https://github.com/pipery-dev/pipery-ios-ci)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for Xcode iOS projects with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-ios-ci@main
        with:
          workspace: App.xcworkspace
          scheme: App
          destination: "platform=iOS Simulator,name=iPhone 16"
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| Lint | SwiftLint when available | `skip_lint` |
| Build | `xcodebuild build` | `skip_build` |
| Test | `xcodebuild test` | `skip_test` |
| Archive | `xcodebuild archive` | `skip_archive` |
| Package | IPA/archive collection into `dist/` | `skip_packaging` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `project_path` | `.` | iOS project root. |
| `workspace` | `` | Xcode workspace path. |
| `project` | `` | Xcode project path. |
| `scheme` | required | Scheme to build. |
| `configuration` | `Release` | Xcode configuration. |
| `destination` | `generic/platform=iOS` | xcodebuild destination. |
| `archive_path` | `build/Pipery.xcarchive` | Archive output path. |
| `export_options_plist` | `` | Optional IPA export options plist. |
