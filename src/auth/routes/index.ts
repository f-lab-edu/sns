import { Router } from 'express';
import AuthService from '../services/auth_service';

const router = Router();

// 로그인
// @ts-ignore
router.post('/login', async (req, res) => {
  const { id } = req.body;
  const result = await AuthService.login(id);
  res.cookie('sessionId', result.id, {
    httpOnly: true,
    secure: false, // dev mode에서는 false
    maxAge: result.expiresInMs,
  });
  
  return res.json(result);
});

// @ts-ignore
router.post('/logout', async (req, res) => {
  const { id } = req.body;
  const result = await AuthService.destroySession(id);
  return res.json(result);
});

export default router;
