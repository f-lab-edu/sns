// @ts-nocheck

import { Router } from 'express';
import UserService from '../services/user_service';

const router = Router();

// 회원가입
router.post('/join', async (req, res) => {
  const { userId, name } = req.body;
  const user = await UserService.join({ email: userId, name });
  return res.json(user);
});

// 특정 유저 정보 반환
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.getUser(userId);
  return res.json(user);
});

export default router;
