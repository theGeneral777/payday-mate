# Payday Mate

**Lend when you're loaded...borrow when you need it!**

Payday Mate is an Australian peer-to-peer lending community built around payday cycles. Members can create accounts, complete profiles, view trust scores, post loan requests, offer lending availability, confirm matches, and record repayments. Money never moves through Payday Mate: members settle directly via PayID after agreeing privately.

## Current status

- Full-stack web MVP deployed at [paydaymate-yvjh5tf4.manus.space](https://paydaymate-yvjh5tf4.manus.space)
- Android Capacitor wrapper included in the project
- Debug APK available in the GitHub Release assets when published
- Manus OAuth authentication and database-backed member features included
- TypeScript validation and automated tests passing at staging time

## Download

When the release is published, download the APK from the **Releases** page. The debug APK is for testing only. A production Android release requires a user-provided signing key and should be signed before public distribution.

## Membership

The planned membership tiers are:

- **Silver — $2.99/week:** network access and up to 2 active loans
- **Bronze — $5.99/week:** up to 5 loans, trust badge, repayment reminders
- **Gold — $9.99/week:** unlimited loans, priority matching, dispute mediation
- **VIP — $14.99/week:** Gold benefits plus featured profile, early alerts, and dedicated support

Subscription checkout is handled outside GitHub through the configured payment provider. GitHub does not hold, move, or settle member loan funds.

## Safety and legal boundaries

Payday Mate is a community platform, not a licensed financial institution. Loans are private arrangements between members. Payday Mate does not guarantee repayment, does not provide financial advice, and does not hold or move money. Members must participate within their means and comply with applicable Australian laws.

Do not post bank-account credentials or sensitive financial details in public channels. Use PayID only with a confirmed match and communicate directly.

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm build
```

## Marketplace note

The Android APK itself is not a GitHub Marketplace product. GitHub Marketplace requires a GitHub App or GitHub Action integration. The Marketplace preparation document in this repository describes a separate, reviewable integration concept; the APK is distributed through GitHub Releases instead.

## Contact and support

Until production support URLs are configured, use the project website or repository Issues for technical feedback. Do not use GitHub Issues to share private PayID or financial details.
