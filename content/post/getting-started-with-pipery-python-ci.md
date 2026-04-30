---
title: "Getting started with Pipery Python CI"
date: 2026-04-30
draft: false
description: "Use Pipery Python CI to run Bandit, dependency scanning, Ruff, pytest, packaging, and PyPI release in one reusable GitHub Actions workflow."
keywords:
  - Pipery Python CI
  - Python CI
  - pytest GitHub Actions
  - Ruff CI
  - PyPI release automation
---

`pipery-dev/pipery-python-ci` is the easiest way to give a Python repository a consistent CI pipeline without stitching together half a dozen actions and shell steps.

It is designed for the common Python path: scan the code, audit dependencies, lint, build, test, package, and publish, while producing a structured `pipery.jsonl` log for the whole run.

## When it fits well

This action is a good match when your repo is using setuptools, Poetry, or `uv`, and you want one workflow that can grow from pull request validation into package release without being rewritten later.

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
      - uses: pipery-dev/pipery-python-ci@v1
        with:
          project_path: .
          pypi_token: ${{ secrets.PYPI_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs worth setting early

- `python_version`: align CI with the runtime you support
- `package_manager`: choose `setuptools`, `poetry`, or `uv` when you want explicit behavior
- `tests_path`: point pytest at the right subset when your repo needs it
- `registry`: keep the default `pypi` or adapt when your publish target changes

## What the action covers

The pipeline includes:

1. SAST with Bandit
2. SCA with `pip-audit` or `safety`
3. linting with Ruff
4. build
5. pytest
6. semantic versioning
7. packaging with `python -m build`
8. publish with Twine

## Why it is useful in practice

Python repos tend to drift over time. One project uses Poetry, another uses plain setuptools, another quietly changed its test command months ago. Pipery gives you a common CI contract while still exposing the real command history through `psh` and `pipery.jsonl` when something fails.

That makes it easier to adopt a standard without losing debuggability.

Source and docs: [pipery-python-ci](https://github.com/pipery-dev/pipery-python-ci).
