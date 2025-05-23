// Constants for Telegram bot configuration
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your bot token
const CHANNEL_ID = '@your_channel_id'; // Replace with your Telegram channel ID
const MESSAGE_ID = 'YOUR_MESSAGE_ID'; // Replace with the message ID for editing existing message

// Define the bots' URLs and their names
const bots = [
  { name: '𝐆𝐞𝐦𝐢𝐧𝐢 𝐀𝐈', url: 'https://httpbin.org/status/200', turl: 'https://t.me/Gemini_AI_MV_Bot' },
  { name: 'sᴛʀɪɴɢ sᴇssɪᴏɴ Bᴏᴛ', url: 'https://httpbin.org/status/200', turl: 'https://t.me/STRING_SESSION_MV_BOT' },
  { name: '𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐫', url: 'https://httpbin.org/status/200', turl: 'https://t.me/Insta_Downloader_MV_bot' }
];


// Event listener for scheduled events from CRON TRIGGERS
addEventListener('scheduled', event => {
  event.waitUntil(handleRequest());
});

// Event listener for HTTP fetch requests
addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/') {
    event.respondWith(handleRequestWrapper());
  } else {
    event.respondWith(new Response('Not Found', { status: 404 }));
  }
});

// Wrapper for handling requests 
async function handleRequestWrapper() {
  try {
    await handleRequest(); 
    return new Response('Success', { status: 200 }); 
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 }); 
  }
}

// Main function to handle bot status checks and messaging
async function handleRequest() {
  // Check the status of each bot
  const statuses = await checkBotsStatus(bots);
  // Format the message
  const message = formatMessage(statuses);
  // Send or edit the message on the Telegram channel
  await sendStatsToTelegram(message);
}

// Function to check the status of each bot
async function checkBotsStatus(bots) {
  const statuses = [];
  for (let bot of bots) {
    try {
      const response = await fetch(bot.url);
      statuses.push({
        name: bot.name,
        status: response.status === 200 ? 'Alive ✅' : 'Offline ⛔ ',
        url: bot.turl
      });
    } catch (error) {
      statuses.push({
        name: bot.name,
        status: 'Offline ⛔ ',
        url: bot.turl
      });
    }
  }
  return statuses;
}

// Function to format the status message
function formatMessage(statuses) {
  const now = new Date();
  const lastCheckDate = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const lastCheckTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });

  let message = `✨ **〘 🇮🇳 𝐈𝐧𝐝𝐢𝐚𝐧 𝐌𝐕 🇮🇳〙- 𝗕𝗼𝘁𝘀 𝗦𝘁𝗮𝘁𝘂𝘀** ✨\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  statuses.forEach((bot) => {
    message += `➤ **${bot.name}**\n`;
    message += `✦ **ѕтᴀтυѕ:** **${bot.status}**\n`;
    message += `   [ᴄʟɪᴄᴋ ᴛᴏ ᴠɪsɪᴛ](${bot.url})\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  });

  message += `📅 **ʟᴀꜱᴛ ᴄʜᴇᴄᴋ:**\n`;
  message += `   **ᴅᴀᴛᴇ:** ${lastCheckDate}\n`;
  message += `   **ᴛɪᴍᴇ:** ${lastCheckTime}\n`;

  return message; 
}

// Function to edit the message on Telegram channel
async function sendStatsToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`; 

  const payload = {
    chat_id: CHANNEL_ID,
    message_id: MESSAGE_ID,  
    text: message,
    parse_mode: 'Markdown',  
    disable_web_page_preview: true 
  };

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' } 
  });
}
