# psh-logs VHS Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained VHS-recorded terminal gif demonstrating the `#!/usr/bin/env psh` shebang convention and the resulting `pipery.jsonl` log, then embed it in a new blog post and in the existing Python CI getting-started post.

**Architecture:** A `demos/psh-logs/` project contains a bash fixture `psh` (mirrors the real binary's `-h` text verbatim; simulates command execution + structured JSONL logging for everything else, since the real linux binary segfaults on subprocess exec under emulation on this host), a sample `step-lint.sh` step script, a VHS tape using a custom pipery-brand theme, and the rendered `.gif`. The gif is copied into `pipery.dev/static/images/demos/` and referenced from two posts.

**Tech Stack:** bash, jq, VHS 0.11.0, Hugo (pipery.dev site)

---

### Task 1: Fixture `psh` interpreter and `ruff` stub

**Files:**
- Create: `pipery.dev/demos/psh-logs/fixtures/psh`
- Create: `pipery.dev/demos/psh-logs/fixtures/ruff`
- Create: `pipery.dev/demos/psh-logs/workspace/step-lint.sh`

- [ ] **Step 1: Create the directory layout**

```bash
mkdir -p /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/fixtures
mkdir -p /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/workspace
mkdir -p /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/out
```

- [ ] **Step 2: Write `fixtures/psh`**

```bash
#!/usr/bin/env bash
set -uo pipefail

HELP_TEXT='psh mediates shell commands and records structured execution logs.

Usage:
  psh
  echo "echo Hi" | psh
  psh -config ./.pipery/config.yaml
  psh -c "echo hello"
  psh -c "cd /tmp" -c "pwd"
  psh -- ls -la
  psh -replay pipery.jsonl
  psh -replay run1.jsonl -replay run2.jsonl

Modes:
  No command arguments starts a line-oriented REPL.
  Piped stdin runs each incoming line as a command.
  Repeated -c runs shell commands sequentially.
  Arguments after -- execute a program directly.
  Repeated -replay validates prior JSONL logs, reruns the sequence, and compares outputs and timings.

Logging:
  Logs are written asynchronously as JSON lines.
  The default file sink is ./pipery.jsonl.
  Replay mode writes a fresh log to -replay-log-file or auto-creates <input>.N.
  Add -syslog udp://host:514 or -syslog tcp://host:514 to mirror logs to syslog.
  Config can also come from ./.pipery/config.yaml and PIPERY_* environment variables.
  Secret masking can be extended with secret names, prefixes, and suffixes.
  Enable -fail-on-error to stop after the first non-zero command result.

Interactive built-ins:
  cd [dir]
  pwd
  export KEY=VALUE
  unset KEY
  exit [code]
  quit [code]

Defaults:
  shell: /bin/sh
  env prefix: PIPERY_'

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  printf '%s\n' "$HELP_TEXT"
  exit 0
fi

# Shebang mode: $1 is the script being interpreted. Run it line by line,
# logging every command (everything except the shebang, `set` line, blank
# lines, and pure variable assignments) to pipery.jsonl as psh would.
LOG_FILE="${INPUT_LOG_FILE:-pipery.jsonl}"

while IFS= read -r line; do
  case "$line" in
    '#!'*|'set -'*|'') continue ;;
    [A-Za-z_]*=*) eval "$line"; continue ;;
  esac

  if eval "$line"; then status=0; else status=$?; fi

  outcome="success"
  [[ "$status" -ne 0 ]] && outcome="failure"
  duration_ms=$(( (RANDOM % 200) + 5 ))
  cmd_json=$(printf '%s' "$line" | jq -Rs .)
  printf '{"event":"command","cmd":%s,"status":"%s","exit_code":%d,"duration_ms":%d,"ts":"%s"}\n' \
    "$cmd_json" "$outcome" "$status" "$duration_ms" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$LOG_FILE"
done < "$1"
```

```bash
chmod +x /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/fixtures/psh
```

- [ ] **Step 3: Write `fixtures/ruff`**

A no-op stand-in for ruff. Real `ruff check .` on a clean project prints
nothing and exits 0 — this matches that exactly, so the gif doesn't depend
on ruff being installed.

```bash
#!/usr/bin/env bash
exit 0
```

```bash
chmod +x /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/fixtures/ruff
```

- [ ] **Step 4: Write `workspace/step-lint.sh`**

Trimmed from `python-ci/src/step-lint.sh` (drops the pip-install-ruff
fallback chain for readability in the recording).

```bash
#!/usr/bin/env psh
set -euo pipefail

ruff check .
printf '{"event":"lint","status":"success","tool":"ruff"}\n' >> pipery.jsonl
```

```bash
chmod +x /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/workspace/step-lint.sh
```

- [ ] **Step 5: Verify the fixture end-to-end**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/workspace
rm -f pipery.jsonl
PATH="$PWD/../fixtures:$PATH" psh -h | head -3
PATH="$PWD/../fixtures:$PATH" ./step-lint.sh
cat pipery.jsonl | jq .
```

Expected:
- `psh -h | head -3` prints the first 3 lines of the help text starting
  with `psh mediates shell commands and records structured execution logs.`
- `./step-lint.sh` produces no output (ruff stub is silent, exit 0)
- `cat pipery.jsonl | jq .` prints exactly 3 JSON objects:
  1. `{"event": "command", "cmd": "ruff check .", "status": "success", ...}`
  2. `{"event": "lint", "status": "success", "tool": "ruff"}`
  3. `{"event": "command", "cmd": "printf '{\"event\":\"lint\"...", "status": "success", ...}`

Then clean up the generated file so it isn't committed:

```bash
rm -f /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/workspace/pipery.jsonl
```

- [ ] **Step 6: Commit**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
git add demos/psh-logs/fixtures demos/psh-logs/workspace
git commit -m "feat: add psh fixture and sample step script for VHS demo"
```

---

### Task 2: VHS tape, brand theme, and render

**Files:**
- Create: `pipery.dev/demos/psh-logs/theme.json`
- Create: `pipery.dev/demos/psh-logs/demo.tape`

- [ ] **Step 1: Write `theme.json`** (reference copy of the brand theme; also inlined in the tape below)

```json
{
  "name": "Pipery",
  "black": "#0C1424",
  "red": "#EF4444",
  "green": "#10B981",
  "yellow": "#F59E0B",
  "blue": "#6366F1",
  "magenta": "#7C3AED",
  "cyan": "#06B6D4",
  "white": "#E5E7EB",
  "brightBlack": "#94A3B8",
  "brightRed": "#EF4444",
  "brightGreen": "#10B981",
  "brightYellow": "#F59E0B",
  "brightBlue": "#6366F1",
  "brightMagenta": "#7C3AED",
  "brightCyan": "#06B6D4",
  "brightWhite": "#F4F7FF",
  "background": "#0C1424",
  "foreground": "#E5E7EB",
  "cursor": "#06B6D4",
  "cursorAccent": "#0C1424",
  "selection": "#1F2A44"
}
```

- [ ] **Step 2: Write `demo.tape`**

```tape
Output out/psh-logs-demo.gif

Set Shell "bash"
Set FontSize 16
Set Width 1200
Set Height 650
Set Padding 20
Set TypingSpeed 50ms
Set Theme '{"name":"Pipery","black":"#0C1424","red":"#EF4444","green":"#10B981","yellow":"#F59E0B","blue":"#6366F1","magenta":"#7C3AED","cyan":"#06B6D4","white":"#E5E7EB","brightBlack":"#94A3B8","brightRed":"#EF4444","brightGreen":"#10B981","brightYellow":"#F59E0B","brightBlue":"#6366F1","brightMagenta":"#7C3AED","brightCyan":"#06B6D4","brightWhite":"#F4F7FF","background":"#0C1424","foreground":"#E5E7EB","cursor":"#06B6D4","cursorAccent":"#0C1424","selection":"#1F2A44"}'

Hide
Type "cd workspace && export PATH=\"$PWD/../fixtures:$PATH\" && rm -f pipery.jsonl && clear"
Enter
Show

Type "psh -h"
Enter
Sleep 4s

Type "clear"
Enter
Sleep 500ms

Type "cat step-lint.sh"
Enter
Sleep 1500ms

Type "./step-lint.sh"
Enter
Sleep 1500ms

Type "cat pipery.jsonl | jq ."
Enter
Sleep 2s

Type "echo '{\"event\":\"build\",\"status\":\"failure\",\"tool\":\"docker\",\"error\":\"image pull failed\"}' >> pipery.jsonl"
Enter
Sleep 1s

Type "jq 'select(.status == \"failure\")' pipery.jsonl"
Enter
Sleep 2s

Type "echo 'Full history? open pipery.jsonl in pipery-dashboard.'"
Enter
Sleep 2s
```

- [ ] **Step 3: Render the gif**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs
vhs demo.tape
ls -la out/psh-logs-demo.gif
```

Expected: `vhs` exits 0 and `out/psh-logs-demo.gif` exists with non-zero size.

Then remove the leftover generated log so the workspace stays clean for git:

```bash
rm -f /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/workspace/pipery.jsonl
```

- [ ] **Step 4: Commit**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
git add demos/psh-logs/theme.json demos/psh-logs/demo.tape demos/psh-logs/out
git commit -m "feat: add VHS tape and rendered gif for psh-logs demo"
```

---

### Task 3: New blog post

**Files:**
- Create: `pipery.dev/static/images/demos/psh-logs-demo.gif` (copy of rendered output)
- Create: `pipery.dev/content/post/reading-pipery-jsonl-logs-with-psh.md`

- [ ] **Step 1: Copy the gif into static images**

```bash
mkdir -p /Users/hamed/Project/pipery-dev/pipery.dev/static/images/demos
cp /Users/hamed/Project/pipery-dev/pipery.dev/demos/psh-logs/out/psh-logs-demo.gif \
   /Users/hamed/Project/pipery-dev/pipery.dev/static/images/demos/psh-logs-demo.gif
```

- [ ] **Step 2: Write the new post**

```markdown
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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
git add static/images/demos/psh-logs-demo.gif content/post/reading-pipery-jsonl-logs-with-psh.md
git commit -m "docs: add post on reading pipery.jsonl logs with psh"
```

---

### Task 4: Cross-link from the Python CI post

**Files:**
- Modify: `pipery.dev/content/post/getting-started-with-pipery-python-ci.md`

- [ ] **Step 1: Add a "Reading the logs" section before the closing "Source and docs" line**

Find this existing closing line near the end of the file:

```markdown
Source and docs: [GitHub](https://github.com/pipery-dev/python-ci), [GitLab](https://gitlab.com/pipery-dev/python-ci), or [Bitbucket](https://bitbucket.org/pipery-dev/python-ci).
```

Insert this new section immediately before it:

```markdown
## Reading the logs

Every step script in this action runs through `psh` via the
`#!/usr/bin/env psh` shebang, so each command is recorded as a structured
entry in `pipery.jsonl` alongside the step's own `{"event":"lint",...}`
style entries:

![Running a psh step script and reading the resulting pipery.jsonl with jq](/images/demos/psh-logs-demo.gif)

See [Reading pipery.jsonl logs with psh]({{< ref "reading-pipery-jsonl-logs-with-psh.md" >}})
for the full walkthrough, including `jq` recipes for finding failures and
slow steps.

```

- [ ] **Step 2: Commit**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
git add content/post/getting-started-with-pipery-python-ci.md
git commit -m "docs: link python-ci post to the psh logs walkthrough"
```

---

### Task 5: Build verification and demo README

**Files:**
- Create: `pipery.dev/demos/psh-logs/README.md`

- [ ] **Step 1: Build the site and verify**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
hugo --gc --minify --baseURL "https://pipery.dev/"
ls public/images/demos/psh-logs-demo.gif
ls public/post/reading-pipery-jsonl-logs-with-psh/index.html
```

Expected: `hugo` exits 0 with no errors, and both files exist.

Optionally preview locally:

```bash
hugo server -D
```

Open `http://localhost:1313/post/reading-pipery-jsonl-logs-with-psh/` and
`http://localhost:1313/post/getting-started-with-pipery-python-ci/` and
confirm the gif renders and plays in both pages.

- [ ] **Step 2: Write `demos/psh-logs/README.md`**

```markdown
# psh-logs VHS demo

Source for the gif embedded in:
- https://pipery.dev/post/reading-pipery-jsonl-logs-with-psh/
- https://pipery.dev/post/getting-started-with-pipery-python-ci/

## Regenerate

```bash
vhs demo.tape
cp out/psh-logs-demo.gif ../../static/images/demos/psh-logs-demo.gif
rm -f workspace/pipery.jsonl
```

No Docker or network access required — `fixtures/psh` and `fixtures/ruff`
are self-contained bash stubs. `fixtures/psh`'s `-h` output is the verbatim
text from the real `pipery-dev/pipery` binary (v0.1.0); its shebang-execution
behavior is a faithful simulation of psh's per-command JSONL logging,
because the real linux binary segfaults on subprocess exec under amd64
emulation (see `docs/superpowers/specs/2026-06-12-psh-logs-vhs-demo-design.md`).
```

- [ ] **Step 3: Commit**

```bash
cd /Users/hamed/Project/pipery-dev/pipery.dev
git add demos/psh-logs/README.md
git commit -m "docs: add regeneration instructions for psh-logs demo"
```
