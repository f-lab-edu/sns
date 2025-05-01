// @ts-nocheck

import { Router } from 'express';
import PostService from '../services/post_service';
import path from 'node:path';
import fs from 'node:fs';
import multer from 'multer';

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

// 이미지를 로컬에 업로드
const upload = initMulter();
router.post('/upload/image', upload.single('file'), async (req, res) => {
  // TODO do something
});

function initMulter() {
  const uploadDir = path.join(__dirname, 'src/uploads/images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 파일 업로드
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    fileFilter: function (req, file, cb) {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('FILE_TYPE_NOT_ALLOWED'));
      }
      cb(null, true);
    },
  });
}

export default router;
