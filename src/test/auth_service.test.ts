import AuthService from '../auth/services/auth_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';
import { validate as isUUID } from 'uuid';

describe('AuthService', () => {
  beforeAll(async () => {
    await initDB();
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('세션을 생성한다.', async () => {
    const id = '123';
    const result = await AuthService.createSession(id);
    expect(isUUID(result.id)).toBe(true);
  });

  test('ID를 받아 해당하는 세션을 삭제한다.', async () => {
    //given
    const id = '456';
    await AuthService.createSession(id);
    //when
    const result = await AuthService.destroySession(id);
    //then
    expect(result).toBe(1);
  });
});
