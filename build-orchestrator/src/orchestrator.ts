import app from './app';
import { redis } from './lib/redis-client';
import { config } from './config';
import { startWorker } from './core/worker';

async function startServer() {
  try {
    await redis.ping();
    console.log('Redis connected');

    startWorker();

    const port = config.get('PORT') || 3000;
    app.listen(port, () => {
      console.log(`Orchestrator running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
}

startServer();
