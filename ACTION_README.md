# Payday Mate Readiness Check

A minimal-permission GitHub Action for Payday Mate repositories. It validates the expected web and Android project structure, optionally runs `pnpm check` and `pnpm test`, reports APK hashes, warns about unsigned release artifacts, and blocks common credential and signing-key files.

## Usage

```yaml
- uses: theGeneral777/payday-mate@v1.0.0
  with:
    run-tests: 'true'
    check-apk: 'true'
    fail-on-unsigned: 'false'
```

For a production release gate, set `fail-on-unsigned: 'true'` and provide a signed APK without committing a keystore or password.

## Permissions and privacy

The Action requires no token and no write permissions. A recommended workflow uses only `contents: read`. It runs on the installing user's GitHub Actions runner, reads repository files, and writes only workflow logs and annotations. It does not access Payday Mate member data, PayID information, payment credentials, or production databases.

## Marketplace status

This repository now contains a real composite GitHub Action that can be prepared for Marketplace submission. Marketplace publication still requires the repository owner to complete GitHub's listing/review flow and supply final public Terms of Service, Privacy Policy, Support, and Contact URLs. The Action itself is separate from the Android APK and from Payday Mate's external membership checkout.
