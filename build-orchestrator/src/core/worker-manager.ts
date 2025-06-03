import Docker from "dockerode";
import { BuildPayload } from "../types/types";
import { config } from "../config";
import { PrismaClient } from "@prisma/client";


export class WorkerManager {
  private docker = new Docker();
  private db = new PrismaClient();
  async spawnWorker(build_id: string, payload: BuildPayload) {
    try {
      console.log("Spawning build-worker with payload:", payload);
      const secretsPath = config.get("BIND_PATH");
      console.log("Resolved secrets path:", secretsPath);
      const container = await this.docker.createContainer({
        Image: "personal-projects-build-worker:latest",
        Env: [
          `BUILD_ID=${build_id}`,
          `PROJECT_ID=${payload.project_id}`,
          `REPO_URL=${payload.repo_url}`,
          `ENVS_JSON=${JSON.stringify(payload.envs) || "{}"}`,
        ],
        HostConfig: {
          AutoRemove: true,
          Memory: 2 * 1024 * 1024 * 1024,
          Mounts: [
            {
              Type: "bind",
              Source: secretsPath,
              Target: "/run/secrets",
              ReadOnly: true,
            },
          ],
        },
      });
      const network = this.docker.getNetwork("personal-projects_default");
      await network.connect({ Container: container.id });
      await container.start();
      const waitResult = await container.wait();
      if (waitResult.StatusCode !== 0) {
        console.log("Build failed");
        await this.db.deployment.update({
          where: { buildId: build_id },
          data: { status: "failed" },
        });
      }
      console.log("build was success");
    } catch (error) {
      console.error("spawnWorker failed:", error);
      throw Error(`spawnWorker failed : ${error}`);
    }
  }
}
