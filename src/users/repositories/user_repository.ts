import { User, UserCreationAttributes } from '../models/user';
import { hash } from 'crypto';

async function addUser({
  email,
  username,
  hashedPw,
  discriminator,
}: UserCreationAttributes) {
  return User.create({
    email,
    username,
    hashedPw,
    discriminator,
  });
}

async function getUser(uuid: string) {
  return User.findByPk(uuid);
}

export default { addUser, getUser } as UserRepository;

export interface UserRepository {
  addUser: (user: UserCreationAttributes) => Promise<InstanceType<typeof User>>;
  getUser: (id: string) => Promise<InstanceType<typeof User> | null>;
}
