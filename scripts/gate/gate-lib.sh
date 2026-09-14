#!/usr/bin/env bash
set -euo pipefail

CONTRACT="${1:-.yaros/gate-contract.json}"

fail() { echo "::error::$*"; exit 1; }
pass() { echo "PASS: $*"; }

require_contract() {
  test -s "$CONTRACT" || fail "Missing gate contract: $CONTRACT"
  python -m json.tool "$CONTRACT" >/dev/null || fail "Invalid JSON: $CONTRACT"
}

json_value() {
  local path="$1"
  python - "$CONTRACT" "$path" <<'PY'
import json, sys
p, path = sys.argv[1], sys.argv[2]
with open(p, encoding='utf-8') as f:
    obj=json.load(f)
cur=obj
for key in path.split('.'):
    if isinstance(cur, dict) and key in cur:
        cur=cur[key]
    else:
        print('')
        raise SystemExit
if isinstance(cur, bool): print(str(cur).lower())
elif cur is None: print('')
elif isinstance(cur, (dict,list)): print(json.dumps(cur, ensure_ascii=False))
else: print(cur)
PY
}

require_value() {
  local path="$1" value
  value="$(json_value "$path")"
  test -n "$value" || fail "Missing required field: $path"
  pass "$path=$value"
}

require_status() {
  local path="$1" expected="${2:-VERIFIED}" actual
  actual="$(json_value "$path.status")"
  test "$actual" = "$expected" || fail "$path.status expected $expected, got ${actual:-MISSING}"
  pass "$path.status=$actual"
}
