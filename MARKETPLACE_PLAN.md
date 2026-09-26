# Payday Mate GitHub Marketplace track

## Important distinction

GitHub Marketplace does not list or sell Android APKs. The Payday Mate Android application should be distributed through a GitHub Release, while a separate GitHub App or GitHub Action would be required for Marketplace review.

## Proposed Marketplace product

**Working name:** Payday Mate Community Operations

**Product type:** GitHub App, only if a genuine GitHub workflow is required.

**Proposed function:** Provide repository-based operational tooling for the Payday Mate engineering project, such as deployment status, issue templates, release checks, and security/readiness checks. It must not access member loan data, PayID information, payment credentials, or the production member database.

**Initial permission principle:** Request the minimum repository permissions necessary. Start with read-only metadata and checks; do not request organization administration, billing, members, contents write, or secrets access unless a documented feature requires it.

## Marketplace requirements still needed

1. A real GitHub App or Action implementation with a clear user benefit.
2. Public terms of service, privacy policy, support, and contact URLs.
3. A production callback/webhook endpoint and verified HTTPS deployment.
4. A detailed permission and data-retention explanation.
5. Pricing plans and billing terms. GitHub Marketplace billing is separate from the Payday Mate member subscription system.
6. A test installation path and screenshots.
7. GitHub Marketplace submission and review by the repository owner.
8. Confirmation that the product is not facilitating regulated financial activity through GitHub.

## Monetization model

Do not represent GitHub Marketplace as processing Payday Mate loan payments. A compliant separation is:

- **GitHub Release:** free download of the test APK and project documentation.
- **Payday Mate membership:** Silver, Bronze, Gold, and VIP subscriptions through the configured external checkout, subject to the operator's legal, tax, refund, and consumer-law obligations.
- **Optional GitHub App:** separate SaaS pricing only after the App exists, its billing model is selected, and Marketplace eligibility is confirmed.

No payment links are inserted into this preparation package because the live Whop checkout URLs and permanent Discord invite were not supplied.

## Submission copy draft

> Payday Mate Community Operations helps maintain the open-source delivery workflow behind Payday Mate. It provides narrowly scoped repository checks and release visibility for the engineering team. It never handles member funds, PayID data, loan requests, trust scores, or private financial information.

## Go/no-go gate

Do not submit this Marketplace track until the App is implemented, the URLs and pricing are final, and the owner has reviewed the requested permissions. The current Payday Mate APK is not itself Marketplace-ready.
