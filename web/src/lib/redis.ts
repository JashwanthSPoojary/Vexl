import { Redis } from "ioredis";
export const redis = new Redis({
  host: process.env.REDIS_URL||"redis-server",
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 5000,
  retryStrategy: (times) => Math.min(times * 100, 5000),
});
