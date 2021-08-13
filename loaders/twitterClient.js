const { TwitterApi } = require("twitter-api-v2");
const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;

module.exports = new TwitterApi(`${twitterBearerToken}`); // (create a client)
