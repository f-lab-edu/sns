// @ts-nocheck

import { Router } from 'express';
import NewsfeedService from '../services/newsfeed_service';

const router = Router();

// newsfeed
// app.get('/newsfeed/newsfeed?search={search}&page_size={page_size}&page={page}', (req, res) => {
//     return Partial<Post>;
// })

// 뉴스피드 목록 반환
router.get('/', async (req, res) => {
  const newfeed = await NewsfeedService.getNewsfeedByUser(req.userId);
  return res.json(newfeed);
});

export default router;
