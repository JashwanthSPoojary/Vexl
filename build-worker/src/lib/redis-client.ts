import { Redis } from "ioredis";
export const redis = new Redis({
  host: "redis",
  port: 6379,
  maxRetriesPerRequest: 3,
  connectTimeout: 5000,
  retryStrategy: (times) => Math.min(times * 100, 5000),
});
