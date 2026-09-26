# Payday Mate: precise CAPTCHA-safe setup guide

This guide turns the supplied Payday Mate brief into an implementation sequence. It deliberately keeps passwords, CAPTCHA answers, 2FA codes, bot tokens, Stripe secret keys, and other credentials on your side. Do not paste any of those values into chat.

> **Important boundary:** Discord’s CAPTCHA cannot be bypassed. If the cloud browser triggers it, use the official local-browser route described below or complete the affected step manually.

## 1. Use the local browser route instead of fighting the CAPTCHA

The most reliable route is to use a desktop Chrome or Edge browser where you are already logged in to Discord. Manus’ official Browser Operator documentation says the local-browser mode uses your existing authenticated sessions and is intended for sites that require login or trigger cloud-browser security checks. In Manus, open **Connectors**, enable **Manus Browser Operator**, approve the browser extension, and then grant browser-control access when prompted.[3]

Open Discord in that local browser at `https://discord.com/app`. If Discord asks for login, complete the login and any CAPTCHA or 2FA yourself in the browser. Never send the password, CAPTCHA answer, backup code, or 2FA code in chat. After the server setup is complete, you can stop Browser Operator by closing the controlled browser tab or revoking the session.

If Browser Operator is unavailable, perform the Discord steps manually in your desktop Discord app. Manus can still prepare the exact channel text, role matrix, website content, and test checklist for you.

## 2. Create or select the Payday Mate server

In Discord, select the **+ Add a Server** button in the server rail, choose **Create My Own**, and choose **For a club or community** if Discord asks. Set the server name to **Payday Mate**. Use this description:

> Australia’s peer-to-peer lending community. Lend and borrow around your payday. All settlement via PayID.

Upload the supplied Payday Mate logo as the server icon. After creation, open **Server Settings → Overview** and confirm the name, icon, description, verification level, and default notification settings. Keep the server private during configuration.

## 3. Create the roles in the correct hierarchy

Open **Server Settings → Roles → Create Role**. Create the roles below. Discord’s role hierarchy is top-to-bottom, and a bot can only manage roles below its highest bot role. Discord’s official permissions guidance recommends requesting only the permissions a bot needs.[1][2]

| Highest-to-lowest role | Colour | Purpose | Permission guidance |
| --- | --- | --- | --- |
| Payday Mate Admin | `#E74C3C` | Owner/admin operations | Use only for trusted staff. Avoid assigning this broadly. |
| Payday Mate Bot | `#3498DB` | Internal bot role | Give only the permissions required by the bot you actually install. |
| VIP Member | `#E67E22` | VIP tier access | No administrative permissions. |
| Gold Member | `#F1C40F` | Gold tier access | No administrative permissions. |
| Bronze Member | `#CD7F32` | Bronze tier access | No administrative permissions. |
| Silver Member | `#BDC3C7` | Silver tier access | No administrative permissions. |
| Member | `#95A5A6` | Base/member role | No administrative permissions. |

After installing Whop and Carl-bot, return to **Server Settings → Roles** and place each bot’s managed role above the member roles it needs to assign or moderate. In particular, the Whop bot role must be above Silver, Bronze, Gold, and VIP for role assignment to work. Carl-bot must be above any roles it must manage.

## 4. Create the categories and channels

In the server, select the server name, choose **Create Category**, and create the categories below. Create each channel inside its matching category.

| Category | Channels | Visibility |
| --- | --- | --- |
| WELCOME | `#welcome`, `#rules`, `#announcements`, `#how-it-works`, `#subscribe` | `@everyone` can view; members cannot post except approved staff/bots. |
| COMMUNITY | `#general`, `#introduce-yourself`, `#member-wins` | Silver and above. |
| LENDING BOARD | `#loan-requests`, `#lender-availability`, `#matches-confirmed`, `#repayment-confirmed` | Silver and above. |
| TRUST AND SCORES | `#trust-leaderboard`, `#repayment-reminders`, `#trust-questions` | Bronze and above. |
| PRIORITY LOUNGE | `#gold-chat`, `#priority-loan-board`, `#dispute-mediation`, `#early-alerts` | Gold and above. |
| VIP SUITE | `#vip-lounge`, `#vip-loan-board`, `#vip-support`, `#featured-profiles` | VIP only. |
| STAFF | `#admin-log`, `#mod-notes`, `#bot-commands` | Admin only. |

## 5. Apply the permission matrix

Open each category’s **Edit Category → Permissions**. Use category-level permissions first, then synchronize child channels. The intended access model is:

| Role | Access |
| --- | --- |
| `@everyone` | WELCOME category only, read-only. |
| Silver Member | WELCOME, COMMUNITY, and LENDING BOARD. |
| Bronze Member | Silver access plus TRUST AND SCORES. |
| Gold Member | Bronze access plus PRIORITY LOUNGE. |
| VIP Member | Gold access plus VIP SUITE. |
| Payday Mate Admin | All categories, including STAFF. |

For the read-only channels, remove **Send Messages** from `@everyone` and member roles. Keep **View Channel** and **Read Message History** enabled. Apply these channel-specific rules:

| Channel | Override |
| --- | --- |
| `#welcome` | Carl-bot can send; members can read only. |
| `#rules` | Admin can send; non-admin members can read only. |
| `#announcements` | Admin can send; non-admin members can read only. |
| `#how-it-works` | Admin can send; non-admin members can read only. |
| `#subscribe` | Admin/Whop bot can send; non-admin members can read only. |
| `#admin-log` | Admin and selected bots only. |
| `#mod-notes` | Admin only. |
| `#bot-commands` | Admin and selected bot roles only. |

## 6. Post and pin the required messages

Post each message in its named channel, then right-click the message and choose **Pin Message**. Do not post private PayID details in any public channel.

### `#rules`

```text
Welcome to Payday Mate.

This is a peer-to-peer lending community for everyday Australians. Members lend to each other around payday cycles and repay directly via PayID. All settlement is between members — Payday Mate does not hold or move any money.

COMMUNITY RULES

1. Be honest. Never post a loan request or lend offer you cannot back up.
2. Repay on time. Your trust score is your reputation here. Late repayment without communication is a violation.
3. Respect everyone. No harassment, discrimination, or aggressive language.
4. One loan request at a time. Do not post duplicate or overlapping requests.
5. Use the correct channels. Loan posts go in #loan-requests, availability posts go in #lender-availability.
6. No advertising. This is not a marketplace for external products or services.
7. No sharing of personal financial account details in public channels. Use PayID only — share PayID details in DMs with your confirmed match only.
8. Disputes must be raised in #dispute-mediation (Gold and VIP). Silver and Bronze members contact an admin directly.

LEGAL NOTE
Payday Mate is a community platform, not a licensed financial institution. All loans are between individual members. Payday Mate does not guarantee repayment and accepts no liability for losses. Participate within your means.

Breaching these rules may result in removal and a permanent trust score penalty.
```

### `#how-it-works`

```text
HOW PAYDAY MATE WORKS

Payday Mate is a peer-to-peer lending community for everyday Australians.

THE IDEA
When it's your payday and you're flush, you can lend a mate on the network what they need. When it's their payday, they pay you back — directly to your PayID. No bank. No interest. Just community trust.

HOW TO LEND
1. Post in #lender-availability using the pinned format
2. Browse #loan-requests and DM someone whose request suits you
3. Agree on the amount and repayment date
4. Send the money via PayID
5. Both parties confirm in #matches-confirmed
6. Borrower repays on their payday via PayID
7. Post in #repayment-confirmed when done

HOW TO BORROW
1. Post in #loan-requests using the pinned format
2. Wait for a lender to DM you
3. Agree on the amount and repayment date
4. Receive the PayID transfer from the lender
5. Both parties confirm in #matches-confirmed
6. Repay via PayID on your next payday
7. Post in #repayment-confirmed when done

TRUST SCORES
Your trust score (0–100) is your reputation on the network. It goes up when you repay on time and complete your profile. Lenders check it before agreeing to lend. Start small, repay early, build your score.

SUBSCRIPTION TIERS
Silver ($2.99/wk) — join the network, up to 2 active loans
Bronze ($5.99/wk) — up to 5 loans, trust badge, repayment reminders
Gold ($9.99/wk) — unlimited loans, priority matching, dispute mediation
VIP ($14.99/wk) — all Gold perks + featured profile, early alerts, dedicated support

Subscribe at the link in #subscribe.
```

### `#loan-requests`

```text
HOW TO POST A LOAN REQUEST

Use the format below exactly. Incomplete posts will be removed.

---
LOAN REQUEST

Amount: $[amount]
Repayment date: [your next payday date, e.g. 12 Sep 2026]
Trust score: [your current trust score, e.g. 87]
PayID type: [phone / email / ABN]
Notes: [optional]
---

EXAMPLE:
---
LOAN REQUEST

Amount: $80
Repayment date: 12 Sep 2026
Trust score: 91
PayID type: Phone
Notes: Regular borrower, always repaid on time.
---

Rules:
- One active request per member at a time
- Do not DM lenders unless they respond to your post first
- Update your post when filled — don't leave old requests open
- Repayment date must be your actual next payday
```

### `#lender-availability`

```text
HOW TO POST LENDER AVAILABILITY

Use the format below exactly.

---
LENDER AVAILABLE

Amount available: $[amount or range]
Available until: [date you need funds returned by]
Preferred borrower trust score: [minimum, e.g. 75+]
PayID type: [phone / email / ABN]
Notes: [optional]
---

EXAMPLE:
---
LENDER AVAILABLE

Amount available: $50–$200
Available until: 19 Sep 2026
Preferred borrower trust score: 80+
PayID type: Phone
Notes: Happy to lend to new members with a verified profile.
---

Rules:
- Update your post when funds are allocated
- Do not accept more borrowers than you can cover
- Confirm the match in #matches-confirmed once agreed
```

### `#introduce-yourself`

```text
Say hello! Drop a quick intro so the community knows who you are.

Name (first name or username):
State:
Payday cycle: [weekly / fortnightly / monthly]
Here to: [borrow / lend / both]
One thing about me:
```

### `#welcome`

Configure Carl-bot to post this automatically rather than manually pinning it:

```text
Welcome to Payday Mate!

Australia's peer-to-peer lending community — lend and borrow around your payday, settle directly via PayID.

Read the rules in #rules
Learn how it works in #how-it-works
Subscribe to access the lending board in #subscribe

Once subscribed, introduce yourself in #introduce-yourself and you're ready to go.
```

## 7. Create the Whop subscription connection

Whop’s current Discord guidance uses the Whop **Discord app** and a Whop bot. It requires an existing Whop and Discord server, then lets the bot assign roles based on membership state.[4]

1. Open `https://whop.com` in your local browser and sign in.
2. Create or open the Payday Mate Whop.
3. Select **Add app**, find **Discord**, and select **Add**. Whop may also prompt you to add its Chat app.
4. Select **Continue with Discord**.
5. In the Discord authorization dialog, choose the Payday Mate server, review the permissions, and select **Authorize**.
6. Return to the Whop Discord app and select **Edit** or **Admin settings**.
7. In Discord, open **Server Settings → Roles** and move the **Whop Bot** role above Silver Member, Bronze Member, Gold Member, and VIP Member. Save the role order.
8. Return to Whop. In the Discord app’s **Roles** tab, select **Refetch roles**, then map each paid product to its corresponding Discord role.
9. In **Settings**, choose `#admin-log` as the event log channel. Configure a past-due role if desired. For cancellations, use **Remove Role** rather than **Kick User** initially; this preserves the member’s history while removing paid access.
10. Set the Discord app visibility to **Product gated** for the paid products. Use **Public** only if you want anyone to see the Discord app before purchasing.
11. Create or connect the four Whop products to the existing Stripe prices supplied in the brief:

| Product | Stripe price ID | Price | Discord role |
| --- | --- | --- | --- |
| Silver | `price_1UCIA3JoUBg14Uu9lc40Mykr` | $2.99/week | Silver Member |
| Bronze | `price_1UCIA3JoUBg14Uu9d1dWNmL1` | $5.99/week | Bronze Member |
| Gold | `price_1UCIA3JoUBg14Uu9g4YTIHwF` | $9.99/week | Gold Member |
| VIP | `price_1UCIA2JoUBg14Uu9ySjRECQs` | $14.99/week | VIP Member |

12. Open the Whop page as a test user, connect the test Discord account through **Connected Accounts**, open the Discord app, and select **Claim Access**. Whop’s user-access documentation describes this connected-account and claim-access flow.[5]
13. Confirm that the correct role appears in Discord and that the corresponding categories become visible. Test cancellation or past-due behavior with a test product before using live subscriptions.

## 8. Install and configure Carl-bot

Carl-bot’s official documentation lists Automod, logging, greetings, moderation, and custom commands as supported features.[6] Use its official dashboard at `https://carl.gg/` rather than an unknown invite link.

1. Open `https://carl.gg/` and select **Add to Discord**.
2. Choose the Payday Mate server, review the requested permissions, and select **Authorize**.
3. In the Carl-bot dashboard, choose Payday Mate.
4. Open **Greetings** and set the welcome channel to `#welcome`. Paste the welcome message from Section 6.
5. Open **Logging** and set the channel to `#admin-log`. Enable joins, leaves, bans, message edits, message deletes, role changes, and invite events if available.
6. Open **Automod**. Enable spam or repeated-message protection. Add external-link blocking rules scoped to `#loan-requests` and `#lender-availability`. Add scam-phrase filters using a conservative review-and-delete action first; do not automatically ban on uncertain phrases.
7. Add channel whitelists for `#welcome`, `#rules`, `#announcements`, `#how-it-works`, and `#subscribe` if needed so the bot does not interfere with pinned information.
8. Test with a private staff-only test channel before enabling enforcement in the lending board. Confirm that a message edit, delete, join, and blocked link produce the expected admin log.

## 9. Connect the website

The deployed Payday Mate website is available at `https://paydaymate-yvjh5tf4.manus.space`. Its Whop and Discord actions are intentionally safe placeholders until the real URLs exist.

The intended values are:

```ts
const WHOP_URL = "https://whop.com/your-live-payday-mate-page";
const DISCORD_INVITE_URL = "https://discord.gg/your-permanent-invite";
```

Once the Whop page and Discord invite exist, provide those two URLs in the project request. The website should then be updated so every tier button opens the live Whop page and the Discord button opens the permanent invite. Do not invent either URL.

To create the permanent Discord invite after the server is configured, open the server, select the server name, choose **Invite People**, open **Edit Invite Link**, set **Expire After** to **Never**, set **Max Number of Uses** to **No limit**, then select **Generate New Link** and copy the result. If Discord does not offer the permanent option for the channel, create the invite from a stable read-only `#welcome` channel and confirm that the link does not expire.

## 10. Configure onboarding emails

Choose one email platform, such as Mailchimp or ConvertKit, and create a sequence triggered by a successful Whop subscription event. The exact trigger depends on the email platform and the Whop integration available to your account; do not assume a webhook exists without checking the platform’s current integration settings.

Create these messages:

| Message | Trigger | Essential content |
| --- | --- | --- |
| Welcome | Immediately after successful subscription | Tier name, tier perks, Discord link, first step to introduce yourself. |
| Payday cycle reminder | One hour after Welcome if the profile cycle is not set | Weekly/fortnightly/monthly explanation and `#introduce-yourself` instructions. |
| Repayment reminder | Two days before the agreed date | Amount, lender name, date, PayID steps, `#repayment-confirmed`, and early communication if circumstances change. |

Use merge fields such as `[First Name]`, `[TIER]`, `[Amount]`, `[Lender Name]`, and `[Repayment Date]`. Keep the emails factual: Payday Mate does not hold funds, guarantee repayment, or provide regulated financial advice.

## 11. Run the complete test

Use a test Discord account and a test subscription where available. Confirm that a new member sees only WELCOME, the Whop claim flow assigns the correct tier role, the role unlocks exactly the intended categories, and a cancellation or past-due state removes paid access without deleting the member’s history. Confirm that Carl-bot posts the welcome message, blocks or flags test external links in the lending board, filters repeated spam, and writes the required event types to `#admin-log`.

Finally, open the website in a private browser window and verify that the live Whop and Discord URLs work, the legal note is visible, and no public channel instructs members to post private PayID details.

## Security checklist

Never provide a Discord password, CAPTCHA answer, 2FA code, backup code, bot token, Stripe secret key, Whop secret, or email-platform password in chat. Use the official Discord authorization screens, keep bot permissions minimal, place bot roles above only the roles they must manage, and revoke or rotate credentials immediately if one is ever exposed.

## References

[1]: https://docs.discord.com/developers/topics/oauth2 "Discord OAuth2 documentation"
[2]: https://docs.discord.com/developers/platform/oauth2-and-permissions "Discord OAuth2 and permissions"
[3]: https://manus.im/docs/features/browser-operator "Manus Browser Operator"
[4]: https://whop.com/blog/link-whop-to-discord/ "Whop: How to link your Whop to a Discord server"
[5]: https://docs.whop.com/memberships-and-access/access-discord-server/access-a-discord-server "Whop: Access a Discord server"
[6]: https://docs.carl.gg/ "Carl-bot documentation"
