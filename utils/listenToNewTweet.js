require("dotenv").config();
const twitterClient = require("../loaders/twitterClient");
const { ETwitterStreamEvent, ETwitterApiError } = require("twitter-api-v2");
const handleNewTweet = require("../handlers/handleNewTweet");

const connectToTwitter = async () => {
  try {
    const stream = await twitterClient.v2.searchStream();

    stream.on(
      // Emitted when a Twitter payload (a tweet or not, given the endpoint).
      ETwitterStreamEvent.Data,
      (eventData) => {
        console.log("Twitter has sent something:", eventData);
        handleNewTweet(eventData.data.id);
      }
    );

    stream.on(
      // Emitted when Node.js {response} emits a 'error' event (contains its payload).
      ETwitterStreamEvent.ConnectionError,
      (err) => console.log("Connection error!", err)
    );

    stream.on(
      // Emitted when Node.js {response} is closed by remote or using .close().
      ETwitterStreamEvent.ConnectionClosed,
      () => console.log("Connection has been closed.")
    );

    /* stream.on(
      // Emitted when a Twitter sent a signal to maintain connection active
      ETwitterStreamEvent.DataKeepAlive,
      () => console.log("Twitter has a keep-alive packet.")
    ); */
  } catch (e) {
    // e is either a TwitterApiRequestError or a TwitterApiError
    if (e.type === ETwitterApiError.Request) {
      // Thrown if request fails (network error).
      console.log("Request failed.", e.requestError);
    } else if (e.type === ETwitterApiError.Response) {
      // Thrown if Twitter responds with a bad HTTP status
      console.log(
        "Twitter didnt accept the request. HTTP code:",
        e.code,
        ", parsed response data:",
        e.data
      );
    }

    setTimeout(connectToTwitter, 10000);
  }
};

module.exports = connectToTwitter;
