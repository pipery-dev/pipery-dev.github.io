---
title: "Getting started with Pipery npm CI"
date: 2026-04-30
draft: false
description: "Set up Pipery npm CI in a Node.js repository to run scanning, linting, tests, packaging, and npm release with structured pipeline logs."
keywords:
  - Pipery npm CI
  - Node.js CI
  - npm GitHub Actions
  - ESLint CI
  - pipery.jsonl
---

If your Node.js workflow keeps growing one shell step at a time, `pipery-dev/pipery-npm-ci` is a clean place to stop and standardize it.

This action is a complete CI workflow for npm and Yarn projects. It covers SAST, dependency scanning, linting, build, test, versioning, packaging, release, and reintegration, while every command is captured in `pipery.jsonl` through `psh`.

## When to use it

Use `pipery-npm-ci` when you want one reusable workflow for JavaScript or TypeScript repositories and you do not want to hand-maintain the usual install, lint, test, package, and publish sequence in every repo.

It is especially helpful when your team wants:

- the same CI behavior across several services
- predictable release behavior for npm packages
- searchable logs instead of long unstructured GitHub output

## Minimal workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pipery-dev/pipery-npm-ci@v1
        with:
          project_path: .
          npm_token: ${{ secrets.NPM_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Good first inputs to set

- `node_version`: pin the runtime your app actually uses
- `package_manager`: set `npm` or `yarn` if you do not want auto-detection
- `tests_path`: narrow test execution when a repo needs it
- `version_bump`: control default release behavior

## What happens in the pipeline

The action runs:

1. SAST with `njsscan`
2. SCA with `npm audit` or `yarn audit`
3. lint with ESLint
4. build with your package manager
5. tests
6. semantic versioning
7. `npm pack`
8. npm publish and SHA tagging

That means the repo owner gets a full CI path without rewriting the same workflow skeleton again.

## Why Pipery helps here

Node pipelines often fail in the annoying middle: lockfile drift, a flaky test, a publish auth issue, an unexpected build script change. Pipery logs each executed command and its output in `pipery.jsonl`, so you can inspect the exact step in the dashboard instead of reconstructing the failure by hand.

Start with the action repo here: [pipery-npm-ci](https://github.com/pipery-dev/pipery-npm-ci).
