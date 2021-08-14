const TelegramBot = require("node-telegram-bot-api");
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

const options = process.env.PORT
  ? {
      webHook: {
        port: process.env.PORT,
      },
    }
  : {
      polling: true,
    };

const bot = new TelegramBot(telegramToken, options);

module.exports = bot;
