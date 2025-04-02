import { User, UserCreationAttributes } from '../models/user'

async function addUser({ id, name }: UserCreationAttributes) {
  return User.create({
    id,
    name,
  });
}

async function getUser(id: string) {
  return User.findByPk(id);
}

export default { addUser, getUser } as UserRepository;

export interface UserRepository {
  addUser: (user: UserCreationAttributes) => Promise<InstanceType<typeof User>>;
  getUser: (id: string) => Promise<InstanceType<typeof User> | null>;
}