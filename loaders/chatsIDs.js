const redisClient = require("./redisClient");
const getChatsIDs = require("../utils/getChatsIDs");

// Get and initialize chatsIDs
function chatsIDs() {
  this.value = [];

  this.update = () => {
    getChatsIDs(redisClient)
      .then((ids) => (this.value = ids))
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .then(() => console.log(this.value));
  };

  this.update();
}

module.exports = new chatsIDs();
