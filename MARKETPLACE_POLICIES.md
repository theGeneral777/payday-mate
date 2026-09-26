# Payday Mate Community Operations — public policy draft

## Product scope

Payday Mate Community Operations is a repository-readiness GitHub Action. It checks project files, runs the repository's declared TypeScript checks and tests, reports APK hashes and sizes, and blocks common credential or signing-key files from being included in a build workspace.

It does not access Payday Mate member accounts, loan requests, trust scores, PayID details, payment credentials, or the production database. It does not transfer money and it does not make financial decisions.

## Data handling

The Action runs in the user's GitHub Actions runner. It reads files available in the checked-out repository and emits check results, warnings, and hashes to the workflow log. It does not send repository contents to a Payday Mate server. GitHub retains workflow logs according to the user's GitHub plan and settings.

## Permissions

The example workflow requests only `contents: read`. The Action does not require a GitHub token, webhook endpoint, organization administration permission, billing permission, secrets access, or write access.

## Terms and support draft

Use of the Action is subject to the repository license and the user's GitHub terms. The Action is provided as release-readiness tooling, not as legal, financial, security, or compliance advice. Report bugs through the repository's Issues page without including PayID details, passwords, signing keys, API keys, or other private financial information.

Before Marketplace submission, the operator must replace this draft with reviewed production Terms of Service, Privacy Policy, Support URL, contact details, license text, and any required Australian consumer-law disclosures.

## Pricing boundary

The initial Action should be published as free tooling. Payday Mate Silver, Bronze, Gold, and VIP memberships remain separate external subscriptions and are not processed by this Action. A paid Marketplace plan should not be enabled until the operator has selected the billing model, refund policy, tax treatment, support SLA, and final legal URLs.
