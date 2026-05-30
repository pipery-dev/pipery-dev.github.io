---
title: "Pipery App Store CD"
description: "CD pipeline for uploading iOS IPA artifacts to App Store Connect"
type: "docs"
weight: 8
---

# Pipery App Store CD

- Repository: [`pipery-appstore-cd`](https://github.com/pipery-dev/pipery-appstore-cd)
- Release tag: `main`
- Catalog: [/catalog/](/catalog/)

Reusable GitHub Action for uploading `.ipa` artifacts to App Store Connect with structured `pipery.jsonl` logging.

## Quick Start

```yaml
jobs:
  publish:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-appstore-cd@main
        with:
          app_identifier: com.example.app
          ipa_path: build/export/App.ipa
          asc_key_id: ${{ secrets.ASC_KEY_ID }}
          asc_issuer_id: ${{ secrets.ASC_ISSUER_ID }}
          asc_api_key_p8_b64: ${{ secrets.ASC_API_KEY_P8_B64 }}
```

## Pipeline Overview

| Step | Tool | Skip Input |
| --- | --- | --- |
| Validate | Input and artifact checks | `skip_upload` |
| Upload | Fastlane `pilot` or `xcrun altool` | `skip_upload` |

## Configuration Options

| Name | Default | Description |
| --- | --- | --- |
| `app_identifier` | required | Bundle identifier. |
| `ipa_path` | auto | `.ipa` path. |
| `asc_key_id` | required | App Store Connect API key ID. |
| `asc_issuer_id` | required | App Store Connect issuer ID. |
| `asc_api_key_p8_b64` | `` | Base64 private key contents. |
| `upload_tool` | `fastlane` | `fastlane` or `xcrun`. |
