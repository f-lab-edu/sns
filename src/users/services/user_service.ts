import UserRepository from '../repositories/user_repository';
import { User, UserCreationAttributes } from '../models/user';

async function join({
  id,
  name,
}: UserCreationAttributes): Promise<InstanceType<typeof User>> {
  if (await getUser(id)) {
    throw new Error('USER_ALREADY_EXISTS');
  }
  return UserRepository.addUser({ id, name });
}

async function getUser(id: string): Promise<InstanceType<typeof User> | null> {
  return UserRepository.getUser(id);
}

export default {
  join,
  getUser,
};
