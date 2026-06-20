#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"
cd "$BACKEND_DIR"

PORT="${PORT:-9090}"
DATABASE_URL="${DATABASE_URL:?DATABASE_URL must be set}"

PARAM_FILE="${PARAM_FILE:-/tmp/param-render.yaml}"

cat > "$PARAM_FILE" <<EOF
networks:
    healthcare:
        port: "${PORT}"
        staticPort: ""
        staticPath: ""
        tlsPort: ""
        tlsKey: ""
        tlsCert: ""
logging:
    logPath: ""
    logSize: 0
    logCompress: false
    skipPaths: []
    logHeader: ""
    useSlog: false
    splunkParams: null
db:
    healthcare:
        dbType: postgres
        dbAddress:
            isPlain: true
            value: "${DATABASE_URL}"
securityModule: {}
remoteApis:
    healthcare:
        domain: ""
        name: ""
        auth:
            grant-type: ""
            user: ""
            password: ""
            client-id: ""
            client-secret: ""
            auth-uri: ""
        options: {}
constants:
    healthcare:
        errorDesc: {}
        messageDesc: {}
parameterGroups:
    healthcare:
        params: {}
secureParameterGroups:
    healthcare:
        secureParams: {}
specific:
    staticBaseUrl: ""
metrics: null
EOF

./paramEncryptor -p "$PARAM_FILE" -c

export PARAM_NAME="$PARAM_FILE"
exec ./healthcare -p "$PARAM_FILE"
