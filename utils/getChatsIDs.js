const redisClient = require("../loaders/redisClient");

module.exports = async () => {
  const chatsIDs = await redisClient.smembersAsync("DRAE-WOTD-ChatsIDs");

  return chatsIDs;
};
