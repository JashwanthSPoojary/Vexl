import { Request, Response, NextFunction } from 'express';

export function validateBuildPayload(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  if (!req.body.project_id || !req.body.repo_url) {
    res.status(400).json({ error: 'Missing required fields' });
    return
  }
  next();
}