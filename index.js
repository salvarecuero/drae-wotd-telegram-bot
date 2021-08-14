// General
require("dotenv").config();
const bot = require("./loaders/telegramBot");
const chatsIDs = require("./loaders/chatsIDs");
const listenToNewTweet = require("./utils/listenToNewTweet");
const addChatToDB = require("./handlers/addChatToDB");
const removeChatFromDB = require("./handlers/removeChatFromDB");
// Environmental variables
const telegramID = process.env.TELEGRAM_BOT_ID;

// Start listening
listenToNewTweet();

// Bot response to certain commands or messages.
bot.onText(/^\/(start|suscribirse|subscribe)/, function (msg) {
  const chatID = msg.chat.id;
  addChatToDB(chatID);
  bot.sendMessage(
    chatID,
    `Intentaré enviar la "Palabra del día" de la RAE cada día. También puedes agregarme a un grupo si así lo deseas.
    Puedes desuscribirte enviando /desuscribirse o /unsubscribe.`
  );
});

bot.onText(/^\/(desuscribirse|unsubscribe)/, function (msg) {
  const chatID = msg.chat.id;
  removeChatFromDB(chatID);
  bot.sendMessage(
    chatID,
    `Has sido desuscripto. Puedes volver a subscribirte enviando /start o /suscribirse.`
  );
});

// Listen to when we are added or removed in a group
bot.on("new_chat_members", function (event) {
  if (event.new_chat_members.some((member) => member.id == telegramID)) {
    console.log("New chat found.");
    const chatID = event.chat.id;
    if (!chatsIDs.value.includes(chatID)) addChatToDB(chatID);
    bot.sendMessage(
      chatID,
      `Buenos días, buenas tardes o buenas noches, según la hora en que me lean. Intentaré enviar la "Palabra del día" de la RAE cada día.`
    );
  }
});

bot.on("left_chat_member", function (event) {
  const member = event.left_chat_member;
  if (member.id == telegramID) {
    const chatID = event.chat.id;
    removeChatFromDB(chatID);
    console.log(`Bot has been kicked out of a group. Chat ID: ${chatID}`);
  }
});

bot.on("polling_error", (err) => console.log(err));
