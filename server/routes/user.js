import express from 'express';
const { Router } = express;
import {asyncRoute} from './misc.js';

const router = Router();

export const controller = async (req, res) => {
  res.status(200).end();
};

router.get('/', asyncRoute(controller));

export default router;
