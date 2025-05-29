import { redis } from "../lib/redis-client";

interface Build {
  id: string;
  projectId: string;
  status: "queued" | "building" | "success" | "failed";
  createdAt: Date;
}

export class BuildState {
  static async track(build_id: string, project_id: string) {
    try {
      await redis.hset(
        `build:${build_id}`,
        "projectId",
        project_id,
        "status",
        "queued",
        "createdAt",
        new Date().toISOString()
      );
    } catch (error) {
      console.error(`Failed to track build ${build_id}:`, error);
      throw new Error(`BuildState.track failed for build ${build_id}`);
    }
  }

  static async updateStatus(build_id: string, status: Build["status"]) {
    try {
      await redis.hset(`build:${build_id}`, "status", status);
    } catch (error) {
      console.error(`Failed to update status for build ${build_id}:`, error);
      throw new Error(`BuildState.updateStatus failed for build ${build_id}`);
    }
  }
}
