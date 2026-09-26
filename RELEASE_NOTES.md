# Payday Mate Android MVP — v1.0.0

## What is included

- Manus-authenticated member accounts
- Member profiles and trust-score records
- Membership state
- Loan requests and lender availability
- Matching and repayment confirmations
- Reporting workflow
- Responsive member hub
- Capacitor Android wrapper

## Important APK status

The current artifacts were generated as:

- `PaydayMate-debug.apk` — installable debug/testing build
- `PaydayMate-release-unsigned.apk` — unsigned release artifact; not suitable for normal public production distribution until signed

Before a public production launch, the operator must provide or create a protected Android signing key, keep it out of GitHub, sign the release build, and verify the signature. Never publish keystores, passwords, OAuth secrets, database credentials, Whop keys, or Discord bot tokens.

## Funds boundary

Payday Mate does not hold or move money. Members settle privately via PayID after agreeing to a match. The app is not a bank, lender, payment processor, or guarantee of repayment.

## Known configuration items

- Live Whop checkout URLs are still required for subscription buttons.
- A permanent Discord invite is still required for community buttons.
- Production email automation requires an authenticated email platform.
- A signed release APK is required for serious public distribution.
