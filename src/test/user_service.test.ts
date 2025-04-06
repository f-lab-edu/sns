// import { describe, expect, test } from '@jest/globals';

// import { UserCreationAttributes } from '../../src/users/models/user';
// import UserService from '../../users/services/user_service';

import UserService from '../users/services/user_service';

// import User_service from '../users/services/user_service';

describe('UserService', () => {
  //TODO service test write

  // beforeEach(() => {
  //     userService = new UserService();
  //   });

  //   afterEach(() => {
  //     jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  //   });

  test('ID와 이름을 받아 유저를 생성할 수 있어야 한다.', async () => {
    const id = '123';
    const name = 'testUser';

    // const result = UserService.join({ id, name });
    // expect(result.id).toBe(id);
    // expect(1).toBe(1);
    // test(1).toEqual(1);
    const result = await UserService.join({ id, name });
    expect(result.id).toBe(id);
  });

  // test('ID로 유저 정보를 가져올 수 있어야 한다.', () => {

  //   // join(123);

  //   const id = 123;
  //   const user = getUser(123);
  //   // user의 id가 123인지 판별하는 식
  //   expect(user).not.toBeNull();
  //   expect(user.id).toBe(id);
  // })

  // test('should find a user by ID', async () => {
  //   const mockUser = { id: '123', name: 'John Doe' };
  //   (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

  //   const user = await .findUserById('123');
  //   expect(user).toEqual(mockUser);
  //   expect(User.findByPk).toHaveBeenCalledWith('123');
  // });
});
