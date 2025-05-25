import { Redis } from "ioredis";
import { config } from "../config";
export const redis = new Redis({
  host: config.get('REDIS_HOST') || "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 5000,
  retryStrategy: (times) => Math.min(times * 100, 5000),
});
