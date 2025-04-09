import UserRepository from '../users/repositories/user_repository';
import { connectDB, syncDB } from '../config/db';

describe('UserRepository', () => {
  beforeEach(async () => {
    await initDB();
  });

  async function initDB() {
    await connectDB();
    await syncDB(); // 개발환경에서만 사용
  }

  test('id, name을 받아 유저를 생성한다.', async () => {
    const id = 'id1';
    const name = 'name1';
    const result = await UserRepository.addUser({ id, name });
    expect(result.id).toBe(id);
  });
});
