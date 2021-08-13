const bot = require("../loaders/telegramBot");
const chatsIDs = require("../loaders/chatsIDs");

module.exports = (text, media) => {
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
