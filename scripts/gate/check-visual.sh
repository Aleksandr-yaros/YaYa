#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_contract
require_status visual
score="$(json_value visual.score)"
critical="$(json_value visual.criticalGap)"
test -n "$score" || fail "Missing visual.score"
test "${critical:-0}" = "0" || fail "Critical visual GAP must be 0, got $critical"
python - "$score" <<'PY'
import sys
score=float(sys.argv[1])
if score < 90:
    raise SystemExit(f"Visual score must be >=90, got {score}")
print(f"PASS: visual.score={score}")
PY
