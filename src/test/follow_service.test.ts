import { beforeAll } from '@jest/globals';
import { initDB } from '../config/db';
import FollowService from '../follows/services/follow_service';
import FollowRepository from '../follows/repositories/follow_repository';

describe('FollowService', () => {
  beforeAll(async () => {
    await initDB();
    // UserRepository.addUser({ id: 'default', name: 'defaultUser' });
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('유저 ID를 받아 유저를 팔로우하는 목록을 조회한다.', async () => {
    const userId = 'user';
    const targetId = 'target';
    const result = await FollowService.addFollow({ userId, targetId });
    expect(result.userId).toBe(userId);
    expect(result.targetId).toBe(targetId);
  });

  test('유저 ID를 받아 유저가 팔로잉하는 목록을 조회한다.', async () => {
    // given
    const userId = 'default';
    const targetId = 'target';

    FollowRepository.addFollow({ userId, targetId });

    // when
    const result = await FollowService.getFollowings(userId);
    const emptyResult = await FollowService.getFollowings(targetId);
    // then
    expect(result).not.toBeNull();
    expect(result[0].targetId).toBe(targetId);
    expect(emptyResult).toEqual([]);
  });

  // test('유저 ID와 타겟 ID를 받아 팔로우를 건다.', async () => {
  //   const id = 'noUser';
  //   const result = await UserService.getUser(id);
  //   expect(result).toBeNull();
  // });
});
