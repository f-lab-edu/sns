import { User, UserColumns } from '../models/user'


function addUser({ id, name }: UserColumns) {
  return User.create({
    id,
    name,
  });
}

async function getUser(id: string) {
  return User.findByPk(id);
}

export { addUser, getUser };
