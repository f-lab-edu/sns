import PostImageService from '../post/services/post_image_service';
import { initDB } from '../config/db';
import { beforeAll, expect } from '@jest/globals';

describe('PostService', () => {
  beforeAll(async () => {
    await initDB();
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });
});
