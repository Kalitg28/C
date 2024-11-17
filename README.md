# 🛠️ ONlineJS - Zanova Bot Status Checker

ONlineJS is a simple JavaScript-based project to monitor the health and uptime of Telegram bots. It performs regular status checks and updates a Telegram channel with the results in real-time.

---

## Features
- 🚀 **Automated Bot Monitoring**: Regularly checks the status of configured bots.
- 📡 **Telegram Channel Updates**: Sends or edits a message in a Telegram channel with the current bot statuses.
- 💡 **Customizable**: Easily add or modify bots to monitor.

---

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/store-x/ONlineJS.git
   cd ONlineJS
   ```

2. **Configure the settings**:
   Open the script file and update the following constants:
   - `TELEGRAM_TOKEN`: Your Telegram bot's API token.
   - `CHANNEL_ID`: The Telegram channel ID where updates will be posted.
   - `MESSAGE_ID`: The message ID for editing (if updating an existing message).
   - `bots`: Add or edit the list of bots with their name, status check URL, and Telegram link.

3. **Deploy**:
   - Recommended to deploy on **Cloudflare Workers** or similar platforms.
   - For Cloudflare Workers:
     1. Paste the script into the Worker dashboard.
     2. Publish the Worker.
     3. Add a **Cron Trigger** from the **Your newly created Worker > Settings > Triggers** section in your Cloudflare dashboard.  
        - Set your preferred time interval for periodic status checks.
   - That's it! No further steps are required.

---

## Usage

- The script automatically runs either on scheduled events or via HTTP fetch.
- When triggered, it:
  1. Checks each bot's status via HTTP requests.
  2. Formats a detailed status message.
  3. Sends or edits the status message in the configured Telegram channel.

---

## Example Output

```
✨ 𝗭𝗲𝗻𝗼𝘃𝗮 𝗕𝗼𝘁𝘀 𝗦𝘁𝗮𝘁𝘂𝘀 ✨

━━━━━━━━━━━━━━━━━━━━━━━━

➤ QUIZORA
✦ Status: Alive ⚡
   [Click to visit](https://t.me/Quizorabot)

━━━━━━━━━━━━━━━━━━━━━━━━

➤ LECTURES BOT
✦ Status: Offline ⛔
   [Click to visit](https://t.me/JEe_lecture_boT)

━━━━━━━━━━━━━━━━━━━━━━━━

📅 Last Check:
   Date: 17/11/2024
   Time: 11:45 PM
```

---

## Dependencies
- **Cloudflare Workers** (or any serverless JavaScript runtime).

---

## License
MIT License. Feel free to use, modify, and share this project.

---

## Contribution
- Found a bug? Want to add new features? Fork the repo and create a pull request.

---

Happy Monitoring! 🎉
