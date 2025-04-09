// @ts-nocheck

import { Router } from 'express';
import UserService from '../services/user_service';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, name } = req.body;
  const user = await UserService.join({ id: userId, name });
  return res.json(user);
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.getUser(userId);
  return res.json(user);
});

export default router;
