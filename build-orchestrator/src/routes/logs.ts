import { Request, Response, Router } from 'express';
import { redis } from '../lib/redis-client';

export async function handleBuildLogs(req: Request, res: Response) {
  const { id: buildId } = req.params;
  const logStreamKey = `build:logs:${buildId}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const existingLogs = await redis.xrange(logStreamKey, '-', '+', 'COUNT', 1000);
    for (const [_, fields] of existingLogs) {
      const index = fields.findIndex((v) => v === 'entry');
      if (index !== -1) {
        res.write(`data: ${fields[index + 1]}\n\n`);
      }
    }
  } catch (err) {
    console.error('Failed to fetch existing logs:', err);
  }

  // Stream new logs
  let lastId = '$';
  const stream = redis.duplicate();
  let clientDisconnected = false;

  req.on('close', () => {
    clientDisconnected = true;
    stream.disconnect();
    res.end();
  });

  while (!clientDisconnected) {
    try {
      const result = await stream.xread('BLOCK', 5000, 'STREAMS', logStreamKey, lastId);
      if (!result) continue;

      const [, messages] = result[0];
      for (const [id, fields] of messages) {
        const index = fields.findIndex((v) => v === 'entry');
        if (index !== -1) {
          res.write(`data: ${fields[index + 1]}\n\n`);
          lastId = id;
        }
      }
    } catch (err) {
      console.error('Log stream error:', err);
      break;
    }
  }
}

// Attach to router
export const logs_router = Router();
logs_router.get('/builds/:id/logs', handleBuildLogs);
