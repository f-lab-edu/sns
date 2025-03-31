// @ts-nocheck

import express from 'express';
import { getUser, addUser } from './model/user';
import {
  getPost,
  addPost,
  getAllPosts,
  getAllPostsByUserId,
} from './model/post';
import { addFollow, getFollowers, getFollowings } from './model/follow';
import { connectDB, syncDB } from './config/db';

const app = express();
const port = 3333;

initDB();

// TODO 테스트 코드 작성
// TODO 엔드포인트 라우터 분리
app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' });
  res.end('hello world!!!!');
});

app.listen(port, () => {
  console.log('start server');
});

app.use(express.json());

app.post('/users', async (req, res) => {
  const { userId, name } = req.body;
  const user = await addUser({ id: userId, name });
  return res.json(user);
});

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await getUser(userId);
  return res.json(user);
});

// follow
app.post('/follow/:targetId', async (req, res) => {
  const targetId = req.params.targetId;
  const userId = req.body.userId;
  const follow = await addFollow({ userId, targetId });
  return res.json(follow);
});

// user의 팔로워 목록 반환
app.get('/follow/:userId/followers', async (req, res) => {
  const userId = req.params.userId;
  const followers = await getFollowers(userId);
  return res.json(followers);
});

// user가 팔로잉하는 목록 반환
app.get('/follow/:userId/followings', (req, res) => {
  const userId = req.params.userId;
  const followings = getFollowings(userId);
  return res.json(followings);
});

// post
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await getPost(postId);

  return res.json(post);
});

app.post('/posts', async (req, res) => {
  const { title, content, userId } = req.body;
  const post = await addPost({ title, content, userId });
  return res.json(post);
});

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts();
  return res.json(posts);
});

// TODO 뉴스피드 기능 작성
// newsfeed
// app.get('/newsfeed/newsfeed?search={search}&page_size={page_size}&page={page}', (req, res) => {
//     return Partial<Post>;
// })

// TODO: 나중에 헤더에 토큰넣으면 url 수정
app.get('/newsfeed/:userId', async (req, res) => {
  const newfeed = await getAllPostsByUserId(req.params.userId);
  return res.json(newfeed);
});

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
  addTestData();
}

function addTestData() {
  addUser({ id: 'a', name: 'a' });
  addUser({ id: 'b', name: 'b' });
  addUser({ id: 'c', name: 'c' });
}
