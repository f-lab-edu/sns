import PostService from '../post/services/post_service';
import PostRepository from '../post/repositories/post_repository';
import { initDB } from '../config/db';
import { beforeAll, expect } from '@jest/globals';

describe('PostService', () => {
  beforeAll(async () => {
    await initDB();
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('제목과 내용을 받아 글을 작성한다.', async () => {
    const userId = 'testUser';
    const title = 'testTitle';
    const content = 'testContent';
    const result = await PostService.addPost({ userId, title, content });
    expect(result.userId).toBe(userId);
    expect(result.title).toBe(title);
  });

  test('글 ID를 받아 정보를 조회한다.', async () => {
    //given
    const id = 1;
    const noId = 999;
    const userId = 'user';
    const title = 'testTitle';
    const content = 'testContent';
    PostRepository.addPost({ title, content, userId });

    // when
    const result = await PostService.getPost(id);
    const emptyResult = await PostService.getPost(noId);
    expect(result).not.toBeNull();
    expect(result!.title).toBe(title);
    expect(emptyResult).toBeNull();
  });

  test('유저ID를 받아 해당 유저가 작성한 모든 글을 조회한다', async () => {
    // given
    const userId = 'user123';
    PostRepository.addPost({ title: 'title1', content: 'content1', userId });
    PostRepository.addPost({ title: 'title2', content: 'content2', userId });
    PostRepository.addPost({ title: 'title3', content: 'content3', userId });

    // when
    const result = await PostService.getAllPostsByUser(userId);
    const emptyResult = await PostService.getAllPostsByUser('noUser');
    expect(result).not.toBeNull();
    expect(result[0].title).toBe('title1');
    expect(emptyResult).toEqual([]);
  });

  test('제목, 내용을 받아 글을 수정한다', async () => {
    // given
    const originPostData = {
      userId: 'user',
      title: 'title1',
      content: 'content1',
    };

    const post = await PostRepository.addPost(originPostData);

    // when
    const updatePostData = {
      id: post.id,
      title: 'title2',
      userId: 'user',
    };

    const result = await PostService.updatePost(updatePostData);
    expect(result).not.toBeNull();
    expect(result.title).toBe(updatePostData.title);
    expect(result.content).toBe(originPostData.content);
    expect(result.userId).toBe(originPostData.userId);
    expect(result.id).toBe(updatePostData.id);
  });
});
