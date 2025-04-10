// @ts-nocheck

import express from 'express';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';
import followRouter from './follow/routes';
import newsfeedRouter from './newsfeed/routes';
import { Session } from './auth/models/session';

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
  // 세션 만들어서 DB에 저장
  const session = await Session.create({
    userId: id,
    expiresInMs: 15 * 60 * 1000, // 15분
  });

  console.log(session);
  return res.json(session);
});

app.post('/auth/logout', async (req, res) => {
  const { id } = req.body;
  const session = await Session.destroy({ where: { userId: id } });
  return res.json(session);
});

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
}
