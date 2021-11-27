const { createClient } = require("redis");

exports.connection = async () => {
  const redisClient = createClient({
    url: "redis://default:Redis123!@redis:6379",
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();

  return redisClient;
};
