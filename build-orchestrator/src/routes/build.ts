import { Router } from "express";
import { generateId } from "../lib/utils";
import { validateBuildPayload } from "../middleware/validation";
import { BuildQueue } from "../core/queue";

const router = Router();
const queue = new BuildQueue();

router.post("/builds", validateBuildPayload, async (req, res) => {
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
});

router.get("/builds/:id/logs", (req, res) => {
  res.setHeader("Content-type", "text/events-stream");
});

export default router;
