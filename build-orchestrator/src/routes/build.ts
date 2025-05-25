import { Request, Response, Router } from "express";
import { generateId } from "../lib/utils";
import { validateBuildPayload } from "../middleware/validation";
import { BuildQueue } from "../core/queue";

const queue = new BuildQueue();

export async function handleBuild(req: Request, res: Response) {
  const build_id = generateId();
  try {
    await queue.addQueue(build_id, { ...req.body });
    res.status(202).json({
      build_id,
      statusUrl: `/builds/${build_id}/status`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue build' });
  }
}

export const build_router = Router();
build_router.post('/builds/build',validateBuildPayload,handleBuild);
