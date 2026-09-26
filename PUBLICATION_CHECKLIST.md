# Payday Mate publication checklist

## GitHub Release

- [x] Existing public repository identified: `CrownedKingCKING/payday-mate`
- [x] Project type and Android wrapper verified
- [x] TypeScript check passes
- [x] Automated tests pass
- [ ] Confirm exact public commit contents
- [ ] Add release documentation to the intended repository
- [ ] Attach the selected APK asset
- [ ] Use a signed release APK for production; debug APK only for testing
- [ ] Publish the GitHub Release after owner review

## GitHub Marketplace

- [ ] Decide whether a GitHub App or Action is genuinely needed
- [ ] Implement the separate integration
- [ ] Host privacy, terms, support, and contact pages
- [ ] Minimize requested GitHub permissions
- [ ] Decide Marketplace pricing and billing
- [ ] Submit for GitHub review

## Payday Mate monetization

- [ ] Supply live Whop checkout URL(s) for each tier or a single tier-selection page
- [ ] Supply a permanent Discord invite
- [ ] Publish Australian consumer, privacy, and financial-risk disclosures appropriate to the service
- [ ] Confirm subscription cancellation/refund handling
- [ ] Keep all loan settlement outside the platform

## Security

- [ ] Never commit Android keystore files or passwords
- [ ] Never commit OAuth, database, Whop, Discord, or email secrets
- [ ] Review public issue templates for accidental financial-data collection
- [ ] Confirm PayID details are never requested in public issues or channels
