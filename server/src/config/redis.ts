import { Redis } from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("REDIS CONNECTED");
    return process.env.REDIS_URL;
  }
  throw new Error("REDIS CONNECTION FAILED");
};

export const redis = new Redis(redisClient());
