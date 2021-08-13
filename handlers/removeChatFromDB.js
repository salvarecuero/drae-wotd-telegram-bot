const redisClient = require("../loaders/redisClient");
const chatsIDs = require("../loaders/chatsIDs");

const removeChatFromDB = async (chatID) => {
  await redisClient
    .sremAsync("DRAE-WOTD-ChatsIDs", chatID)
    .then(() => console.log(`New user added to DB: ${chatID}`))
    .then(() => chatsIDs.update());
};

module.exports = removeChatFromDB;
