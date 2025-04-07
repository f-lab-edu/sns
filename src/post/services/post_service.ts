import {
  Post,
  PostCreationAttributes,
  PostUpdateAttributes,
} from '../models/post';
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

async function updatePost(postAttributes: PostUpdateAttributes): Promise<Post> {
  return PostRepository.updatePost(postAttributes);
}

export default {
  addPost,
  getPost,
  getAllPostsByUser,
  updatePost,
};
