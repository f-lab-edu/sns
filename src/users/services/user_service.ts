import UserRepository from '../repositories/user_repository';
import { User, UserCreationAttributes } from '../models/user';

async function join({
  id,
  name,
}: UserCreationAttributes): Promise<InstanceType<typeof User>> {
  return UserRepository.addUser({ id, name });
}

async function getUser(id: string): Promise<InstanceType<typeof User> | null> {
  return UserRepository.getUser(id);
}

export default {
  join,
  getUser,
};
