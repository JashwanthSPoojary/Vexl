"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const redis_client_1 = require("./redis-client");
class Logger {
    project_id;
    build_id;
    constructor(project_id, build_id) {
        this.project_id = project_id;
        this.build_id = build_id;
    }
    async logToRedis(level, message) {
        const entry = JSON.stringify({
            timestamp: new Date().toISOString(),
            level,
            buildId: this.build_id,
            message
        });
        await redis_client_1.redis.xadd(`logs:${this.project_id}`, '*', 'entry', entry);
    }
    async log(message) {
        console.log(`[INFO] ${message}`);
        await this.logToRedis('info', message);
    }
    async error(message) {
        console.error(`[ERROR] ${message}`);
        await this.logToRedis('error', message);
    }
}
exports.Logger = Logger;
