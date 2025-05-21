import { redis } from "../lib/redis-client";

interface Build {
  id: string;
  projectId: string;
  status: "queued" | "building" | "success" | "failed";
  createdAt: Date;
}
export class BuildState {
  static async track(build_id: string, project_id: string) {
    await redis.hset(
      `build:${build_id}`,
      "projectId",
      project_id,
      "status",
      "queued",
      "createdAt",
      new Date().toISOString()
    );
  }
  static async updateStatus(build_id: string, status: Build["status"]) {
    await redis.hset(`build:${build_id}`, "status", status);
  }
}
