const { TwitterApi } = require("twitter-api-v2");
const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;

const twitterClient = new TwitterApi(`${twitterBearerToken}`); // (create a client)
module.exports = twitterClient;
