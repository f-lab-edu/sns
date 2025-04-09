// @ts-nocheck

import express from 'express';
import UserService from './users/services/user_service';
import PostService from './post/services/post_service';
import FollowService from './follow/services/follow_service';
import NewsfeedService from './newsfeed/services/newsfeed_service';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';

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

// follow
app.post('/follow/:targetId', async (req, res) => {
  const targetId = req.params.targetId;
  const userId = req.body.userId;
  const follow = await FollowService.addFollow({ userId, targetId });
  return res.json(follow);
});

// user의 팔로워 목록 반환
app.get('/follow/:userId/followers', async (req, res) => {
  const userId = req.params.userId;
  const followers = await FollowService.getFollowers(userId);
  return res.json(followers);
});

// user가 팔로잉하는 목록 반환
app.get('/follow/:userId/followings', (req, res) => {
  const userId = req.params.userId;
  const followings = FollowService.getFollowings(userId);
  return res.json(followings);
});

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
