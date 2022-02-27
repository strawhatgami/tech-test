import express from 'express';
import { controllerWrapper } from './misc.js';
import { userRouter as sessionRouter } from './session.js';
import { getRequesterData } from './userControllers.js';

const { Router } = express;

const router = Router();

router.get('/me', controllerWrapper(getRequesterData));

router.use('/:userId/session/', sessionRouter);

export default router;
