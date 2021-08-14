const bot = require("../loaders/telegramBot");
const chatsIDs = require("../loaders/chatsIDs");

const defaultMsg = "#PalabraDelDía de la RAE será enviada diariamente.";

module.exports = (text = defaultMsg, media) => {
  chatsIDs.value.forEach((chatID) => {
    if (media) {
      bot.sendPhoto(chatID, media, {
        caption: text,
      });
    } else {
      bot.sendMessage(chatID, text);
    }
  });
};
