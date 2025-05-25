import { Queue, Worker } from "bullmq";
import { redis } from "../lib/redis-client";
import { BuildPayload } from "../types/types";
import { WorkerManager } from "./worker-manager";

export class BuildQueue {
  private queue: Queue;
  private worker: Worker;
  constructor() {
    this.queue = new Queue("builds", {
      connection: redis,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      },
    });
    this.worker = new Worker(
      "builds",
      async (job) => {
        console.log("Received job:", job.id);
        await new WorkerManager().spawnWorker(job.id!, job.data);
      },
      { connection: redis, concurrency: 2 }
    );
    this.worker.on("failed", (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
    this.worker.on('completed', job => {
      console.log(`✅ Job ${job.id} completed.`);
    });
  }
  async addQueue(build_id: string, payload: BuildPayload) {
    return this.queue.add("build", payload, {
      jobId: build_id,
    });
  }
}
