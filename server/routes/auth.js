import express from 'express';
import {
  authenticateFromToken,
  authenticateLocal,
} from '../infra/auth.js';

const { Router } = express;

export function ensureConnected(req, res, next) {
  if (!req.user) {
    const err = new Error('Unauthorized (not connected)');
    err.status = 401;
    return next(err);
  }

  next();
}

const router = Router();
router.post('/login', authenticateLocal);
router.use(authenticateFromToken);
export default router;
