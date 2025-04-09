// @ts-nocheck

import express from 'express';
import UserService from './users/services/user_service';
import PostService from './post/services/post_service';
import FollowService from './follow/services/follow_service';
import NewsfeedService from './newsfeed/services/newsfeed_service';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';
import followRouter from './follow/routes';

const app = express();
const port = 3333;

initDB();

// TODO 엔드포인트 라우터 분리
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

// TODO 뉴스피드 기능 작성
// newsfeed
// app.get('/newsfeed/newsfeed?search={search}&page_size={page_size}&page={page}', (req, res) => {
//     return Partial<Post>;
// })

// TODO: 나중에 헤더에 토큰넣으면 url 수정
app.get('/newsfeed/:userId', async (req, res) => {
  const newfeed = await NewsfeedService.getNewsfeedByUser(req.params.userId);
  return res.json(newfeed);
});

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
}
