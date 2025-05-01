import PostImageService from '../post/services/post_image_service';
import PostService from '../post/services/post_service';
import { initDB } from '../config/db';
import { beforeAll, expect } from '@jest/globals';

describe('PostService', () => {
  beforeAll(async () => {
    await initDB();
  });

  test('이미지를 업로드한다', async () => {
    const result = PostImageService.uploadImage();
    expect(result).not.toBeNull();
  });

  test('이미지 url을 전달받아 게시글 이미지를 업로드한다', async () => {
    //given
    const post = await PostService.addPost({
      title: 'title1',
      content: 'content1',
      userId: 'user123',
    });

    //when
    const result = await PostImageService.createPostImage(post.id, '/test/url');

    //then
    expect(result).not.toBeNull();
    expect(result.url).toBe('/test/url');
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });
});
