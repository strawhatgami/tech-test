import express from 'express';
import { controllerWrapper } from './misc.js';
import {
  getUserSessions,
  getAllSessions,
  postSession,
  getSession,
  putSession,
  deleteSession,
} from './sessionControllers.js';

const { Router } = express;

export const userRouter = Router();
userRouter.get('/', controllerWrapper(getUserSessions));

const router = Router();
router.get('/', controllerWrapper(getAllSessions));
router.post('/', controllerWrapper(postSession));
router.get('/:sessionId', controllerWrapper(getSession));
router.put('/:sessionId', controllerWrapper(putSession));
router.delete('/:sessionId', controllerWrapper(deleteSession));
export default router;
