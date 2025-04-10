// @ts-nocheck

import express from 'express';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';
import followRouter from './follow/routes';
import newsfeedRouter from './newsfeed/routes';
import { Session } from './auth/models/session';
import AuthService from './auth/services/auth_service';

const app = express();
const port = 3333;

initDB();

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' });
  res.end('hello world!!!!');
});

app.listen(port, () => {
  console.log('start server');
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/follow', followRouter);
app.use('/newsfeed', newsfeedRouter);

app.post('/auth/login', async (req, res) => {
  const { id } = req.body;
  const session = await AuthService.createSession(id);
  return res.json(session);
});

app.post('/auth/logout', async (req, res) => {
  const { id } = req.body;
  const sessionCount = await AuthService.destroySession(id);
  return res.json(sessionCount);
});

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
}
