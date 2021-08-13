require("dotenv").config();
const redis = require("redis");
const { promisifyAll } = require("bluebird");

const redisHostname = process.env.REDIS_HOSTNAME;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PW;

promisifyAll(redis);
const redisClient = new redis.createClient({
  host: redisHostname,
  port: redisPort,
  password: redisPassword,
});

module.exports = redisClient;
