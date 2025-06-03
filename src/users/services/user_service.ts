import UserRepository from '../repositories/user_repository';
import { User, UserCreationAttributes } from '../models/user';

async function join({
  email,
  username,
}: UserCreationAttributes): Promise<InstanceType<typeof User>> {
  if (await getUser(email)) {
    throw new Error('USER_ALREADY_EXISTS');
  }
  return UserRepository.addUser({
    email: email,
    username,
    hashedPw: '123123',
    discriminator: '1231',
  });
}

async function getUser(id: string): Promise<InstanceType<typeof User> | null> {
  return UserRepository.getUser(id);
}

export default {
  join,
  getUser,
};
