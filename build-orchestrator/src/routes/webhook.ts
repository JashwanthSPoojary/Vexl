import { Webhooks } from "@octokit/webhooks";
import { raw, Request, Response, Router } from "express";
import { buildQueue } from "../core/queue";
import { BuildPayload } from "../types/types";
import { parseJsonToEnvRecord } from "../lib/utils";
import { db } from "../lib/prisma-client";

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

export async function handleWeebhook(req: Request, res: Response) {
  try {
    const signature = req.headers["x-hub-signature-256"];
    if (!signature || typeof signature !== "string") {
      res.status(400).send("Missing or invalid signature");
      return;
    }
    const body = (req.body as Buffer).toString("utf8");
    if (!(await webhooks.verify(body, signature as string))) {
      console.log("Unauthorized webhook");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const event = JSON.parse(body);
    if (!event.repository.name || !event.repository.owner.login) {
      console.log("no webhook repo name and owner");
      res.status(401).json({ error: "no webhook repo name and owner" });
      return;
    }
    const project = await db.deployment.findFirst({
      where: {
        repoName: event.repository.name,
        repoOwner: event.repository.owner.login,
      },
    });
    if (!project) {
      console.log("no project from db");
      res.status(401).json({ error: "Project not found" });
      return;
    }
    const envs = parseJsonToEnvRecord(project.envs);
    const buildPayload: BuildPayload = {
      project_id: project.deployUrl,
      repo_url: project.repoUrl,
      envs: envs ?? "{}",
    };
    const job = await buildQueue.getJob(project.buildId);

    if (job) {
      const state = await job.getState();
      console.log("📦 Existing job state:", state);

      // Remove the job only if it's in a safe-to-remove state
      if (["completed", "failed", "waiting", "delayed"].includes(state)) {
        await job.remove();
        console.log("🗑️ Old job removed");

        await buildQueue.add("build", buildPayload, {
          jobId: project.buildId,
        });
        console.log("✅ Job re-added to queue");
      } else {
        console.log("🚫 Job is currently active, skipping re-add");
      }
    } else {
      // No job with that ID exists — safe to add a new one
      await buildQueue.add("build", buildPayload, {
        jobId: project.buildId,
      });
      console.log("✅ New job added");
    }

    console.log("added to queue");
    await db.deployment.update({
      where: {
        buildId: project.buildId,
      },
      data: {
        status: "queued",
      },
    });
    res.status(200).json({ success: "Done the redeployment" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Failed to webhook build" });
  }
}

export const webhook_router = Router();
webhook_router.post(
  "/webhooks/github",
  raw({ type: "application/json" }),
  handleWeebhook
);
