#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_contract
require_value visualContract
require_value intent
require_value requirement
require_status baseline
require_status task
pass "Requirement gate verified"
