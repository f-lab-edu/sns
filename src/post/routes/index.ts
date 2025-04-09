// @ts-nocheck

import { Router } from 'express';
import PostService from '../services/post_service';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await PostService.getAllPosts();
  return res.json(posts);
});

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await PostService.getPost(postId);

  return res.json(post);
});

router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  const post = await PostService.addPost({ title, content, userId });
  return res.json(post);
});

export default router;
