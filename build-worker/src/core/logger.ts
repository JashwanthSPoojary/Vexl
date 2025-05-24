import { redis } from "../lib/redis-client";

export class Logger {
  constructor(private project_id: string, private build_id: string) {}
  private async logToRedis(level: "info" | "error", message: string) {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      build_id: this.build_id,
      project_id:this.project_id,
      message,
    });
    await redis.xadd(`logs:${this.build_id}`, "*", "entry", entry);
  }
  async log(message: string) {
    console.log(`[INFO] ${message}`);
    await this.logToRedis("info", message);
  }
  async error(message: string) {
    console.error(`[ERROR] ${message}`);
    await this.logToRedis("error", message);
  }
}
