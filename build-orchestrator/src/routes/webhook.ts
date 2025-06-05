import { Webhooks } from "@octokit/webhooks";
import { raw, Request, Response, Router } from "express";
import { BuildQueue } from "../core/queue";
import { BuildPayload } from "../types/types";
import { parseJsonToEnvRecord } from "../lib/utils";
import { db } from "../lib/prisma-client";

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});
const queue = new BuildQueue();

export async function handleWeebhook(req: Request, res: Response) {
  try {
    console.log("logging the webhook secret : ");
    console.log(process.env.GITHUB_WEBHOOK_SECRET);
    const signature = req.headers["x-hub-signature-256"];
    if (!signature || typeof signature !== "string") {
      console.log("not gonna make it");

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
    console.log("envent is :");
    console.log(event);
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
    console.log("project db : ");
    console.log(project);
    if (!project) {
      console.log("no project from db");
      res.status(401).json({ error: "Project not found" });
      return;
    }
    const envs = parseJsonToEnvRecord(project.envs);
    console.log("envs:");
    console.log(envs);
    const buildPayload: BuildPayload = {
      project_id: project.projectName,
      repo_url: project.repoUrl,
      envs:envs??'{}'
    };
    console.log("build payload:");
    console.log(buildPayload);
    await queue.addQueue(project.buildId, buildPayload);
    console.log("added to queue");
    await db.deployment.update({
      where:{
        buildId:project.buildId
      },
      data:{
        status:"queued"
      }
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
