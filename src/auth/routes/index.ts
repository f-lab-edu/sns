import { Router } from 'express';
import AuthService from '../services/auth_service';

const router = Router();

// 로그인
// @ts-ignore
router.post('/login', async (req, res) => {
  const { id } = req.body;
  const result = await AuthService.createSession(id);
  return res.json(result);
});

// @ts-ignore
router.post('/logout', async (req, res) => {
  const { id } = req.body;
  const result = await AuthService.destroySession(id);
  return res.json(result);
});

export default router;
