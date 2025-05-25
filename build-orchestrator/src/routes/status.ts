import { Router } from "express";
import { Request, Response } from "express";
import { redis } from "../lib/redis-client";

export async function handleBuildStatus(req: Request, res: Response) {
  const { id: build_id } = req.params;
  try {
    const status = await redis.hget(`build:${build_id}`, "status");
    const created_at = await redis.hget(`build:${build_id}`, "createdAt");

    res.status(202).json({
      build_id,
      status,
      created_at,
      logsUrl: `/builds/${build_id}/logs`, 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch build status" });
  }
}

export const status_router = Router();
status_router.get("/builds/:id/status", handleBuildStatus);
