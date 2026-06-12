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
