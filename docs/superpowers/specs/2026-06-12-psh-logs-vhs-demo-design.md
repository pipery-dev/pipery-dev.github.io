# VHS demo gif: reading psh logs (pilot)

Date: 2026-06-12
Status: pilot for a 5-part series of VHS-recorded terminal gifs

## Background

The user wants a series of VHS-recorded terminal gifs covering pipery usage,
embedded into pipery.dev blog posts (existing posts where related, new posts
where none exist):

1. **psh + reading `pipery.jsonl` logs** (this pilot)
2. General "how to use pipery" (CI action running end-to-end)
3. Deploy bot (`pipery-deploy-bot`)
4. Release bot (`pipery-release-bot`)

This spec covers #1 only. Once approved and built, the same
tape/fixture/theme pattern is reused for the remaining topics in follow-up
work.

## Key finding: real `psh` binary can't execute commands here

`psh` ships as a Go binary, released only for linux. Downloaded and run via
Docker (debian:bookworm-slim, amd64 binary under Rosetta emulation on this
Apple Silicon host):

- `psh -h` — works, prints full usage text (no subprocess spawned)
- `psh -c "..."`, `psh -- ...`, piped stdin, shebang execution — all SIGSEGV
  in `runtime.netpoll` / `os/exec` (`newosproc`). This matches the comment in
  `python-ci/src/main.sh` explaining why CI test mode swaps in a bash-wrapper
  `psh` stub.

Decision: build a small bash fixture stub named `psh` for the demo, used for
everything in the recording. Its `-h` output is the **verbatim real text**
captured from the actual binary (below), so that part is byte-accurate. The
execution/logging behavior is a faithful simulation consistent with
`CONVENTIONS.md`'s documented JSONL schema. No Docker/network needed to
re-record.

### Captured real `psh -h` output (to hardcode verbatim in the fixture)

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
  env prefix: PIPERY_
```

## File layout

New top-level dir, parallel to `videos/` (which holds the Remotion
marketing-video projects — kept separate since this is a different toolchain):

```
pipery.dev/demos/psh-logs/
  demo.tape              # VHS script
  theme.json             # pipery-brand VHS theme (shared by future demos too)
  fixtures/
    psh                  # bash stub: real -h text + simulated exec/logging
    step-lint.sh         # trimmed #!/usr/bin/env psh sample step script
  out/
    psh-logs-demo.gif    # rendered output, committed (small file)
  README.md              # `vhs demo.tape` to regenerate
```

Rendered gif is copied to `pipery.dev/static/images/demos/psh-logs-demo.gif`
and embedded via standard markdown:
`![Reading psh logs](/images/demos/psh-logs-demo.gif)`

## Fixture: `fixtures/psh`

Bash script, executable, placed first on `$PATH` during recording
(`PATH="$PWD/fixtures:$PATH"`).

- `psh -h` → prints the verbatim text captured above.
- Invoked as a shebang interpreter (`./step-lint.sh` with
  `#!/usr/bin/env psh` resolving to this stub): reads the script, skips the
  shebang line and `set -euo pipefail`, runs each remaining non-empty,
  non-comment line via `bash -c`, and for lines that are plain commands
  (not the manual `printf '{"event":...}' >> $LOG` lines already in the
  script) appends a psh-style per-command entry to `pipery.jsonl`:

  ```json
  {"event":"command","cmd":"ruff check .","status":"success","exit_code":0,"duration_ms":842,"ts":"2026-06-12T10:15:32Z"}
  ```

  `status` is `"success"`/`"failure"` based on the command's real exit code;
  `duration_ms` from real wall-clock timing of the simulated run (will be
  small/instant, which is fine — it's illustrative).

This keeps `pipery.jsonl` containing a realistic **mix** of:
- manual high-level events the step script writes itself
  (`{"event":"lint","status":"success","tool":"ruff"}` — from
  `CONVENTIONS.md`)
- automatic per-command entries from psh
  (`{"event":"command","cmd":...}`)

which is exactly the "read and understand psh logs" teaching point.

## `fixtures/step-lint.sh`

Trimmed from the real `python-ci/src/step-lint.sh` (drops the
pip-install-ruff fallback chain for readability):

```bash
#!/usr/bin/env psh
set -euo pipefail

LOG="${INPUT_LOG_FILE:-pipery.jsonl}"
PROJECT="${INPUT_PROJECT_PATH:-.}"

ruff check "${PROJECT}"
printf '{"event":"lint","status":"success","tool":"ruff"}\n' >> "${LOG}"
```

The fixture's simulated `ruff check .` prints a couple of lines of
ruff-style "All checks passed!" output and exits 0.

## Demo scenario (`demo.tape`), ~25-30s

1. `psh -h` — usage banner (real text)
2. `cat step-lint.sh` — show the shebang convention
3. `./step-lint.sh` — runs it; prints ruff output; psh logs each command
4. `cat pipery.jsonl | jq .` — pretty-printed structured log, both entry
   kinds visible
5. `jq 'select(.status=="failure")' pipery.jsonl` — "how to spot what broke"
   (against a second pre-seeded log line with a failure, appended before this
   step so the filter returns something)
6. Closing `echo` line pointing at `pipery-dashboard` for a GUI view of the
   same file

## VHS styling (`theme.json`, shared across the series)

Custom theme matching `pipery.dev/assets/css` brand vars:

| Role | Color |
|---|---|
| background | `#0C1424` |
| foreground | `#E5E7EB` |
| cursor | `#06B6D4` |
| green (success) | `#10B981` |
| red (failure) | `#EF4444` |
| yellow | `#F59E0B` |
| blue | `#6366F1` |
| magenta | `#7C3AED` |
| cyan | `#06B6D4` |

`demo.tape` settings: `Set Shell bash`, `Set FontSize 16`,
`Set Width 1200`, `Set Height 650`, `Set TypingSpeed 50ms`, with `Sleep`
pauses after each command's output for readability, `Output out/psh-logs-demo.gif`.

## Post placement

- **New post**: `content/post/reading-pipery-jsonl-logs-with-psh.md`
  - Frontmatter: `title: "Reading pipery.jsonl logs with psh"`,
    `date: 2026-06-12`, `draft: false`, description + keywords following the
    pattern of existing posts.
  - Body: what psh is, the `#!/usr/bin/env psh` shebang convention, embedded
    gif, walkthrough of the JSONL fields shown in the gif, `jq` recipes
    (failures, durations, group by tool), pointer to `pipery-dashboard` for a
    GUI view.
- **Existing post update**: `content/post/getting-started-with-pipery-python-ci.md`
  - Short new section ("Reading the logs") + same embedded gif, linking to
    the new post for the full walkthrough. This post already name-drops `psh`
    and `pipery.jsonl` in its closing paragraph.

## Verification

- `vhs demo.tape` runs without Docker/network, produces
  `out/psh-logs-demo.gif`.
- `hugo` build (or `hugo server`) renders both posts with the gif visible.
- Spot-check gif dimensions/readability at blog content width.

## Future work (topics 2-4)

Same `demos/<topic>/` pattern, reusing `theme.json`:

- **General pipery usage**: gif of a CI action run end-to-end against a
  sample repo (extends the python-ci or npm-ci getting-started post).
- **Deploy bot**: gif of the scheduling workflow YAML +
  `curl` against a local mock server replaying `pipery-deploy-bot`'s
  documented API, added to `scheduling-one-time-deploys.md`.
- **Release bot**: new post `content/post/...-pipery-release-bot.md` +
  gif of `curl` against a mock server replaying the release-plan API
  documented in `content/docs/bots/pipery-release-bot.md`.
