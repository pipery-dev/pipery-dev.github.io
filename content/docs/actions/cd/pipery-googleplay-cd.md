---
title: "Pipery Google Play CD"
description: "CD pipeline for publishing Android APK/AAB artifacts to Google Play"
type: "docs"
weight: 7
---

# Pipery Google Play CD

- Repository: [`pipery-googleplay-cd`](https://github.com/pipery-dev/pipery-googleplay-cd)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for publishing Android `.aab` or `.apk` artifacts to Google Play with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-googleplay-cd@main
        with:
          package_name: com.example.app
          artifact_path: app/build/outputs/bundle/release/app-release.aab
          track: internal
          service_account_json_b64: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64 }}
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| Validate | Input and artifact checks | `skip_upload` |
| Upload | Fastlane `supply` or Gradle Play Publisher | `skip_upload` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `package_name` | required | Android application package name. |
| `artifact_path` | auto | `.aab` or `.apk` path. |
| `track` | `internal` | Google Play track. |
| `release_status` | `completed` | Release status for Fastlane supply. |
| `service_account_json_b64` | `` | Base64 service account JSON. |
| `gradle_publish_task` | `` | Optional Gradle Play Publisher task. |
