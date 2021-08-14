const sendWOTD = require("./sendWOTD");
const twitterClient = require("../loaders/twitterClient");

module.exports = async (tweetID) => {
  const tweet = await twitterClient.v2.singleTweet(tweetID, {
    expansions: ["attachments.media_keys"],
    "media.fields": ["url"],
  });

  tweet.data.text = tweet.data.text.substring(
    0,
    tweet.data.text.lastIndexOf("https")
  );

  sendWOTD(tweet.data.text, tweet.includes.media[0].url);
};
