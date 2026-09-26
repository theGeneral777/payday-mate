#!/usr/bin/env bash
set -euo pipefail

fail() { echo "::error::$1"; exit 1; }
warn() { echo "::warning::$1"; }
info() { echo "::notice::$1"; }

[[ -f package.json ]] || fail "package.json is missing"
[[ -f capacitor.config.ts ]] || fail "capacitor.config.ts is missing"
[[ -d android ]] || fail "android wrapper directory is missing"
[[ -f android/app/build.gradle ]] || fail "android/app/build.gradle is missing"

if [[ "$INPUT_RUN_TESTS" == "true" ]]; then
  command -v pnpm >/dev/null 2>&1 || fail "pnpm is required when run-tests=true"
  pnpm check
  pnpm test
fi

if [[ "$INPUT_CHECK_APK" == "true" ]]; then
  shopt -s nullglob
  apks=( *.apk )
  if (( ${#apks[@]} == 0 )); then
    warn "No APK files found in the repository root"
  else
    for apk in "${apks[@]}"; do
      size=$(wc -c < "$apk" | tr -d ' ')
      sha=$(sha256sum "$apk" | awk '{print $1}')
      echo "APK: $apk (${size} bytes; sha256:${sha})"
    done
  fi
  if [[ -f PaydayMate-release-unsigned.apk ]]; then
    if [[ "$INPUT_FAIL_ON_UNSIGNED" == "true" ]]; then
      fail "Unsigned release APK detected; sign it before production distribution"
    fi
    warn "PaydayMate-release-unsigned.apk is present; it must not be used for production distribution"
  fi
fi

# Prevent accidental publication of common credential files.
secret_files=$(find . -path './.git' -prune -o -path './node_modules' -prune -o -type f \( -name '.env' -o -name '.env.*' -o -name '*.jks' -o -name '*.keystore' -o -name 'google-services.json' \) -print)
if [[ -n "$secret_files" ]]; then
  echo "$secret_files"
  fail "Credential or signing-key file detected in the repository"
fi

info "Payday Mate readiness checks completed"
