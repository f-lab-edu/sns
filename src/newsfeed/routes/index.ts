// @ts-nocheck

import { Router } from 'express';
import NewsfeedService from '../services/newsfeed_service';

const router = Router();

// newsfeed
// app.get('/newsfeed/newsfeed?search={search}&page_size={page_size}&page={page}', (req, res) => {
//     return Partial<Post>;
// })

router.get('/:userId', async (req, res) => {
  const newfeed = await NewsfeedService.getNewsfeedByUser(req.params.userId);
  return res.json(newfeed);
});

export default router;
