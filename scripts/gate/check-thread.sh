#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
MODE="${2:-merge}"
require_contract

python - "$CONTRACT" "$MODE" <<'PY'
import json, sys
path, mode = sys.argv[1], sys.argv[2]
with open(path, encoding='utf-8') as f:
    d=json.load(f)
checks=[
 ('Source', bool(d.get('source'))),
 ('Intent', bool(d.get('intent'))),
 ('Requirement', bool(d.get('requirement'))),
 ('DesignBaseline', d.get('baseline',{}).get('status')=='VERIFIED'),
 ('Task', d.get('task',{}).get('status')=='VERIFIED'),
 ('PR', d.get('pr',{}).get('status')=='VERIFIED'),
 ('CI', d.get('ci',{}).get('status')=='VERIFIED'),
 ('Staging', d.get('staging',{}).get('status')=='VERIFIED'),
 ('Tests', d.get('tests',{}).get('status')=='VERIFIED'),
 ('Evidence', d.get('evidence',{}).get('status')=='VERIFIED'),
 ('OwnerAcceptance', d.get('ownerAcceptance',{}).get('status')=='VERIFIED'),
]
for name, ok in checks:
    print(('VERIFIED' if ok else 'MISSING').ljust(9), name)
verified=sum(ok for _,ok in checks)
print(f'THREAD HEALTH {verified}/11')
required=10 if mode=='merge' else 11
# For merge, owner acceptance is the only allowed missing link.
if mode=='merge':
    required_names={name for name,_ in checks if name!='OwnerAcceptance'}
    failed=[name for name,ok in checks if name in required_names and not ok]
else:
    failed=[name for name,ok in checks if not ok]
if failed:
    print('BLOCKED:', ', '.join(failed))
    raise SystemExit(1)
if verified < required:
    raise SystemExit(1)
print(f'PASS: {mode} gate')
PY
