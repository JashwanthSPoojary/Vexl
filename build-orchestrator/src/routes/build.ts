import { Request, Response, Router } from "express";
import { validateBuildPayload } from "../middleware/validation";
import { buildQueue } from "../core/queue";


export async function handleBuild(req: Request, res: Response) {
  const build_id = req.params.build;
  try {
    await buildQueue.add("build", { ...req.body }, { jobId: build_id });
    res.status(202).json({
      build_id,
      statusUrl: `/builds/${build_id}/status`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue build' });
  }
}

export const build_router = Router();
build_router.post('/builds/:build',validateBuildPayload,handleBuild);
