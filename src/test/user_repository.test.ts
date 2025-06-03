import UserRepository from '../users/repositories/user_repository';
import { connectDB, syncDB } from '../config/db';

// TODO mock
describe('UserRepository', () => {
  beforeEach(async () => {
    await initDB();
  });

  async function initDB() {
    await connectDB();
    await syncDB(); // 개발환경에서만 사용
  }

  test('email, username, pw을 받아 유저를 생성한다.', async () => {
    const email = 'test@email.com';
    const username = 'name1';
    const pw = 'testPw1';
    const hashedPw = 'asdlkfjalsdjflaksdjf';
    const discriminator = '1231';
    const result = await UserRepository.addUser({
      email,
      username,
      hashedPw,
      discriminator,
    });
    expect(result.uuid).not.toBeNull();
  });
});
