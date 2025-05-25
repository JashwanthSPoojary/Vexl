import Docker from "dockerode";
import { BuildPayload } from "../types/types";
import path from "path";

export class WorkerManager {
  private docker = new Docker();
  async spawnWorker(build_id: string, payload: BuildPayload) {
    try {
      console.log("Spawning build-worker with payload:", payload);
      const secretsPath = path.join(process.cwd(), "secrets");
      console.log('Resolved secrets path:', secretsPath);
      await this.docker.run("build-worker", [], process.stdout, {
        Env: [
          `BUILD_ID=${build_id}`,
          `PROJECT_ID=${payload.project_id}`,
          `REPO_URL=${payload.repo_url}`,
          `ENVS_JSON=${JSON.stringify(payload.envs) || '{}'}`,
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
    } catch (error) {
        console.error('spawnWorker failed:', error);
        throw Error(`spawnWorker failed : ${error}`);
    }
  }
}
