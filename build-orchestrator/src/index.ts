import express from 'express';
import { config } from './config';
import { build_router } from './routes/build';
import { status_router } from './routes/status';
import { logs_router } from './routes/logs';
import helmet from 'helmet';
import { redis } from './lib/redis-client';

const app = express();

app.use(express.json());
app.use(helmet());


app.use('/api', build_router);
app.use('/api', logs_router);
app.use('/api',status_router);

app.get('/health', (req, res) => {
  const redisStatus = redis.status === 'ready' ? 'connected' : 'disconnected';
  res.json({ status: 'ok', redis: redisStatus });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.get('API_PORT'), () => {
  console.log(`Orchestrator running on port ${config.get('API_PORT')}`);
});