#!/bin/sh
set -e

if [ -d "/run/secrets" ]; then
  for secret in /run/secrets/*; do
    varname=$(basename "$secret")
    export "$varname"="$(cat "$secret")"
  done
fi

exec "$@"
