import AuthService from '../auth/services/auth_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';
import { validate as isUUID } from 'uuid';

describe('AuthService', () => {
  beforeAll(async () => {
    await initDB();
    // UserRepository.addUser({ id: 'default', name: 'defaultUser' });
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('세션을 생성한다.', async () => {
    const id = '123';
    const result = await AuthService.createSession(id);
    expect(isUUID(result.id)).toBe(true);
  });
});
