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
const url = process.env.APP_URL;

const bot = new TelegramBot(telegramToken, options);

if (process.env.PORT) bot.setWebHook(`${url}/bot${telegramToken}`);

module.exports = bot;
