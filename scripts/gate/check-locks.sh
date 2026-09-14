#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_contract
require_status locks
critical="$(json_value locks.criticalViolations)"
test "${critical:-0}" = "0" || fail "LOCK violation detected: $critical critical violations"
pass "LOCK regression boundary verified"
