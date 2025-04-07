import PostService from '../post/services/post_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';

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

  // test('ID를 받아 유저 정보를 조회한다.', async () => {
  //   const id = 'default';
  //   const result = await UserService.getUser(id);
  //   expect(result).not.toBeNull();
  //   expect(result!.id).toBe(id);
  // });
  //
  // test('존재하지 않는 유저로 접근하면 null을 반환한다.', async () => {
  //   const id = 'noUser';
  //   const result = await UserService.getUser(id);
  //   expect(result).toBeNull();
  // });
});
