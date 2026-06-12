#!/usr/bin/env psh
set -euo pipefail

ruff check .
printf '{"event":"lint","status":"success","tool":"ruff"}\n' >> pipery.jsonl
