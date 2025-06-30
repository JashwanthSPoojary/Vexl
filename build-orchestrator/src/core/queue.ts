import { Queue } from "bullmq";
import { redis } from "../lib/redis-client";

export const buildQueue = new Queue("builds", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
});