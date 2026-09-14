#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_contract
require_status ci
require_status tests
score="$(json_value tests.behaviorScore)"
test -n "$score" || fail "Missing tests.behaviorScore"
python - "$score" <<'PY'
import sys
score=float(sys.argv[1])
if score < 100:
    raise SystemExit(f"Behavior score must be 100, got {score}")
print(f"PASS: behaviorScore={score}")
PY
