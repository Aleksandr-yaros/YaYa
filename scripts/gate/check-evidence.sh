#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_contract
require_status pr
require_status staging
require_status evidence
require_value evidence.uri
require_value evidence.commitSha
require_value evidence.testReport
require_value evidence.targetImage
require_value evidence.resultImage
require_value evidence.diffImage
pass "Evidence Pack independently addressable"
