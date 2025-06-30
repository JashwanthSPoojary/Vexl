import { Worker } from "bullmq";
import { redis } from "../lib/redis-client";
import { db } from "../lib/prisma-client";
import { WorkerManager } from "./worker-manager";


export function startWorker() {
  const worker = new Worker(
    "builds",
    async (job) => {
      console.log("⚙️ Processing job:", job.id);
      await new WorkerManager().spawnWorker(job.id!, job.data);
    },
    { connection: redis, concurrency: 2 }
  );

  worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
  });

  worker.on("failed", async (job, err) => {
    await db.deployment.update({
      where: { buildId: job?.id },
      data: { status: "failed" },
    });
    console.error(`❌ Job ${job?.id} failed:`, err);
  });

  console.log("Worker started and listening...");
}
