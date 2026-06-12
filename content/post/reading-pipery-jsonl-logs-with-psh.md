---
title: "Reading pipery.jsonl logs with psh"
date: 2026-06-12
draft: false
description: "How the #!/usr/bin/env psh shebang turns every command in a pipery step script into a structured pipery.jsonl entry, and how to read that log with jq."
keywords:
  - psh
  - pipery.jsonl
  - structured logging
  - CI debugging
  - jq
---

Every `pipery-*-ci` and `pipery-*-cd` action runs its `src/step-*.sh`
scripts through `psh` instead of plain `bash`:

```bash
#!/usr/bin/env psh
set -euo pipefail

ruff check .
printf '{"event":"lint","status":"success","tool":"ruff"}\n' >> pipery.jsonl
```

`psh` is the shared Go runtime from `pipery-dev/pipery`. When a script with
the `#!/usr/bin/env psh` shebang runs, psh reads it line by line, runs each
command, and writes a structured JSON entry for it to `pipery.jsonl` —
in addition to whatever the script itself writes to that file.

## What this looks like

![Running a psh step script and reading the resulting pipery.jsonl with jq](/images/demos/psh-logs-demo.gif)

Running `./step-lint.sh` above produces a `pipery.jsonl` with three entries:

```jsonl
{"event":"command","cmd":"ruff check .","status":"success","exit_code":0,"duration_ms":42,"ts":"2026-06-12T10:15:32Z"}
{"event":"lint","status":"success","tool":"ruff"}
{"event":"command","cmd":"printf '{\"event\":\"lint\",\"status\":\"success\",\"tool\":\"ruff\"}\\n' >> pipery.jsonl","status":"success","exit_code":0,"duration_ms":107,"ts":"2026-06-12T10:15:32Z"}
```

Two kinds of entries show up:

- **`"event":"command"`** — written automatically by psh for every command
  it runs: the literal command (`cmd`), its exit code, a rough duration, and
  a timestamp.
- **`"event":"lint"`** (or `build`, `sca`, `test`, `version`, `package`,
  `release`, `reintegrate`) — written manually by the step script itself, per
  the event/status schema in `CONVENTIONS.md`.

Both land in the same file, so `pipery.jsonl` is a complete, ordered record
of what a step actually did — not just what it was supposed to do.

## Reading the log

The whole point of structured logging is that you don't have to scroll
through raw CI output. A few `jq` recipes that come up constantly:

**What failed?**

```bash
jq 'select(.status == "failure")' pipery.jsonl
```

**What did psh actually run, in order?**

```bash
jq -r 'select(.event == "command") | .cmd' pipery.jsonl
```

**Which commands were slow?**

```bash
jq 'select(.event == "command") | select(.duration_ms > 1000)' pipery.jsonl
```

**High-level step outcomes only** (skip the per-command noise):

```bash
jq 'select(.event != "command")' pipery.jsonl
```

## When `psh -h` is useful

`psh` also doubles as a small interactive/scripting shell. `psh -h` covers
the other modes — piped stdin, repeated `-c`, `-- program`, and
`-replay` for replaying and diffing a previous run against a fresh one:

```
psh mediates shell commands and records structured execution logs.

Usage:
  psh
  echo "echo Hi" | psh
  psh -config ./.pipery/config.yaml
  psh -c "echo hello"
  psh -c "cd /tmp" -c "pwd"
  psh -- ls -la
  psh -replay pipery.jsonl
  psh -replay run1.jsonl -replay run2.jsonl
```

`-replay` is worth calling out: point it at a `pipery.jsonl` from a previous
run and psh reruns the same command sequence, comparing exit codes and
timings against the original — useful for confirming a fix actually changed
the outcome of a specific step, not just the overall job status.

## Beyond the terminal

For a full build's `pipery.jsonl`, scrolling `jq` output gets old fast.
`pipery-dashboard` reads the same file and gives you a filterable,
sortable view across every event — handy when a CI run has dozens of steps
across SAST, SCA, lint, build, test, versioning, packaging, release, and
reintegration.

Source and docs: [pipery-dev/pipery](https://github.com/pipery-dev/pipery).
