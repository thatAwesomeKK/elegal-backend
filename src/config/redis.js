import { createClient } from "redis";

export const redisConnect = async () => {
  try {
    const redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });
    redisClient.on("error", function (err) {
      console.log("Could not establish a connection with redis. " + err);
    });
    redisClient.on("connect", function (err) {
      console.log("Connected to redis successfully");
    });
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.log(error);
  }
};
