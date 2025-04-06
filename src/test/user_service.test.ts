// import { describe, expect, test } from '@jest/globals';

// import { UserCreationAttributes } from '../../src/users/models/user';
// import UserService from '../../users/services/user_service';

import UserService from '../users/services/user_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';

describe('UserService', () => {
  //TODO service test write
  beforeAll(async () => {
    await initDB();
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });

  test('ID와 이름을 받아 유저를 생성할 수 있어야 한다.', async () => {
    const id = '123';
    const name = 'testUser';
    const result = await UserService.join({ id, name });
    expect(result.id).toBe(id);
  });
});
