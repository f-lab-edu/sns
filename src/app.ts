// @ts-nocheck

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';
import followRouter from './follow/routes';
import newsfeedRouter from './newsfeed/routes';
import authRouter from './auth/routes';

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
app.use(cookieParser());

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/follow', followRouter);
apiRouter.use('/newsfeed', newsfeedRouter);

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
}
