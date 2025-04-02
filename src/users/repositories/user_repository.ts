import { User, UserColumns } from '../models/user'

async function addUser({ id, name }: UserColumns) {
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
  addUser: (user: UserColumns) => Promise<InstanceType<typeof User>>;
  getUser: (id: string) => Promise<InstanceType<typeof User> | null>;
}