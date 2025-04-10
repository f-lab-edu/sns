// @ts-nocheck

import { Router } from 'express';
import FollowService from '../services/follow_service';

const router = Router();

// 특정 사용자를 팔로우
router.post('/:targetId', async (req, res) => {
  const targetId = req.params.targetId;
  const { userId } = req;
  const follow = await FollowService.addFollow({ userId, targetId });
  return res.json(follow);
});

// user의 팔로워 목록 반환
router.get('/:userId/followers', async (req, res) => {
  const userId = req.params.userId;
  const followers = await FollowService.getFollowers(userId);
  return res.json(followers);
});

// user가 팔로잉하는 목록 반환
router.get('/:userId/followings', async (req, res) => {
  const userId = req.params.userId;
  const followings = await FollowService.getFollowings(userId);
  return res.json(followings);
});

export default router;
