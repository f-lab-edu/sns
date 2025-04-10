// @ts-nocheck

import { Router } from 'express';
import PostService from '../services/post_service';

const router = Router();

// 모든 게시글을 반환
router.get('/', async (req, res) => {
  const posts = await PostService.getAllPosts();
  return res.json(posts);
});

// 특정 게시글을 반환
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await PostService.getPost(postId);

  return res.json(post);
});

// 새로운 게시글을 추가
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  const post = await PostService.addPost({ title, content, userId });
  return res.json(post);
});

export default router;
