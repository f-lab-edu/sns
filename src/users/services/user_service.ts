import { User, UserCreationAttributes } from "../models/user";
import UserRepository from "../repositories/user_repository";

async function join({ id, name }: UserCreationAttributes): Promise<InstanceType<typeof User>>{
    return UserRepository.addUser({ id, name });
}

async function getUser(id: string) {
    return UserRepository.getUser(id);
}


export default { join, getUser };