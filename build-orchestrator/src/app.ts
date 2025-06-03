import express, { NextFunction, Request, Response } from 'express';
import { build_router } from './routes/build';
import { status_router } from './routes/status';
import { logs_router } from './routes/logs';
import helmet from 'helmet';
import { redis } from './lib/redis-client';
import cors from 'cors'
import { webhook_router } from './routes/webhook';

const app = express();

app.use(cors());
app.use('/api',webhook_router);
app.use(express.json());
app.use(helmet());

app.use('/api', build_router);
app.use('/api', logs_router);
app.use('/api', status_router);

app.get('/health', (_req, res) => {
  const redisStatus = redis.status === 'ready' ? 'connected' : 'disconnected';
  res.json({ status: 'ok', redis: redisStatus });
});

app.use((err: Error, _req:Request, res:Response, _next:NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
