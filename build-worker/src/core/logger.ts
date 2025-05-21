import { redis } from "../lib/redis-client";

export class Logger {
  constructor(private project_id: string, private build_id: string) {}
  private async logToRedis(level: "info" | "error", message: string) {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      buildId: this.build_id,
      message,
    });
    await redis.xadd(`logs:${this.project_id}`, "*", "entry", entry);
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
