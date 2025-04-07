import { PostCreationAttributes } from '../models/post';
import PostRepository from '../repositories/post_repository';

async function addPost(param: PostCreationAttributes) {
  return PostRepository.addPost(param);
}

async function getPost(id: number) {
  return PostRepository.getPost(id);
}

async function getAllPostsByUser(userId: string) {
  return PostRepository.getAllPostsByUser(userId);
}

export default {
  addPost,
  getPost,
  getAllPostsByUser,
};
