import UserService from '../users/services/user_service';
import UserRepository from '../users/repositories/user_repository';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';
import user_service from '../users/services/user_service';

describe('UserService', () => {
  beforeAll(async () => {
    await initDB();
    UserRepository.addUser({ id: 'default', name: 'defaultUser' });
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('ID와 이름을 받아 유저를 생성한다.', async () => {
    const id = '123';
    const name = 'testUser';
    const result = await UserService.join({ id, name });
    expect(result.id).toBe(id);
  });

  test('ID를 받아 유저 정보를 조회한다.', async () => {
    const id = 'default';
    const result = await UserService.getUser(id);
    expect(result).not.toBeNull();
    expect(result!.id).toBe(id);
  });

  test('존재하지 않는 유저로 접근하면 null을 반환한다.', async () => {
    const id = 'noUser';
    const result = await UserService.getUser(id);
    expect(result).toBeNull();
  });

  test('이미 존재하는 ID로 가입을 시도하면 에러를 반환한다.', async () => {
    const id = 'user';
    const name = 'name';
    await UserService.join({ id, name });
    await expect(UserService.join({ id, name })).rejects.toThrowError(
      'USER_ALREADY_EXISTS',
    );
  });
});
