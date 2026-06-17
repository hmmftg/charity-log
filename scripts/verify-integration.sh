#!/usr/bin/env bash
# Runtime reliability verification checklist for backend + frontend integration.
set -euo pipefail

API_BASE="${API_BASE:-http://localhost:9090/api/v1}"
UMS_BASE="${UMS_BASE:-http://localhost:9090/ums}"
UMS_API="${UMS_API:-http://localhost:9090/api/v1/ums}"
REQUEST_ID="verify-$(date +%s)"

pass() { echo "[PASS] $1"; }
fail() { echo "[FAIL] $1"; exit 1; }

echo "Using API_BASE=$API_BASE"
echo "Using UMS_BASE=$UMS_BASE"
echo "Request-Id=$REQUEST_ID"

# 1) Visits list contract
VISITS_CODE=$(curl -s -o /tmp/visits.json -w "%{http_code}" \
  -H "Request-Id: $REQUEST_ID" \
  "$API_BASE/visits/all?_start=0&_end=10")
[[ "$VISITS_CODE" == "200" ]] || fail "visits/all returned $VISITS_CODE"
grep -q '"result"' /tmp/visits.json || fail "visits/all missing result envelope"
pass "visits/all response contract"

# 2) Request-Id header propagation
RID=$(curl -s -D - -o /dev/null -H "Request-Id: $REQUEST_ID" "$API_BASE/visits/all" | rg -i "^Request-Id:" || true)
[[ -n "$RID" ]] && pass "Request-Id header observed" || echo "[WARN] Request-Id not echoed by server"

# 3) Protected endpoint without auth should fail
CHECK_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$UMS_API/check/")
[[ "$CHECK_CODE" == "401" || "$CHECK_CODE" == "403" ]] && pass "unauthenticated /ums/check rejected ($CHECK_CODE)" || fail "/ums/check should reject unauthenticated access"

# 4) Standard error envelope on bad request
ERR_CODE=$(curl -s -o /tmp/err.json -w "%{http_code}" "$API_BASE/visits/not-a-uuid")
[[ "$ERR_CODE" == "404" || "$ERR_CODE" == "400" ]] && pass "invalid visit id returns client error ($ERR_CODE)" || echo "[WARN] invalid visit id returned $ERR_CODE"

echo "Verification complete."
