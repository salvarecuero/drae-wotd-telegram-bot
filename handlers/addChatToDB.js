const redisClient = require("../loaders/redisClient");
const chatsIDs = require("../loaders/chatsIDs");

const addChatToDB = async (chatID) => {
  await redisClient
    .saddAsync("DRAE-WOTD-ChatsIDs", chatID)
    .then(() => console.log(`New chat added to DB: ${chatID}`))
    .then(() => chatsIDs.update());
};

module.exports = addChatToDB;
