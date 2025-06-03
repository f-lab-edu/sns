import AuthService from '../auth/services/auth_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';
import { validate as isUUID } from 'uuid';
import UserService from '../users/services/user_service';

describe('AuthService', () => {
  beforeAll(async () => {
    await initDB();
    await UserService.join({ id: 'defaultId', name: 'defaultName' });
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('로그인한다.', async () => {
    const id = 'defaultId';
    const result = await AuthService.login(id);
    expect(isUUID(result.id)).toBe(true);
  });

  // REVIEW - 이미 로그인한 유저일때 세션을 새로 생성해서 대체하는게 아니라 기존 세션을 이용하는게 일반적인가요?
  test('이미 로그인한 유저라면 존재하는 세션을 반환한다.', async () => {
    // given
    const id = 'duplicateId';
    await UserService.join({ id, name: 'duplicatedName' });
    const prevResult = await AuthService.login(id);
    console.log(prevResult);

    //when
    const result = await AuthService.login(id);
    expect(isUUID(result.id)).toBe(true);
    expect(result.id).toBe(prevResult.id);
  });

  test('세션을 생성한다.', async () => {
    const id = 'defaultId';
    const result = await AuthService.createSession(id);
    expect(isUUID(result.id)).toBe(true);
  });

  test('ID를 받아 해당하는 세션을 삭제한다.', async () => {
    //given
    const id = 'defaultId';
    await AuthService.createSession(id);
    //when
    const result = await AuthService.destroySession(id);
    //then
    await expect(result).toBeGreaterThanOrEqual(1);
  });

  test('가입하지 않은 ID로 로그인을 시도하면 에러를 반환한다.', async () => {
    const id = 'notJoinedUser';
    await expect(AuthService.login(id)).rejects.toThrowError('USER_NOT_FOUND');
  });
});
