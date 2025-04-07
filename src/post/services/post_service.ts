import { PostCreationAttributes } from '../models/post';
import PostRepository from '../repositories/post_repository';

async function addPost(param: PostCreationAttributes) {
  return PostRepository.addPost(param);
}

export default {
  addPost,
};
