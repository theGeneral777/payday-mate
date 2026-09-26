# Verified integration findings

Discord’s official documentation states that OAuth2 apps are created in the Discord Developer Portal and that the `bot` scope adds a bot to a selected guild. The `applications.commands` scope supports registering slash commands, and bot permissions should be limited to what the bot actually needs. Bot tokens must be treated like passwords and never exposed publicly. Sources: https://docs.discord.com/developers/topics/oauth2 and https://docs.discord.com/developers/platform/oauth2-and-permissions

Manus Browser Operator uses the user’s local browser and existing authenticated sessions. The official guidance says to enable Browser Operator in Manus Connectors, grant access when asked, and use the local browser for authenticated sites because it avoids many cloud-browser CAPTCHA and security-check issues. Source: https://manus.im/docs/features/browser-operator
