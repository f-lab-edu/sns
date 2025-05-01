import {
  PostImage,
  PostImageAttributes,
  PostImageCreationAttributes,
} from '../models/post_image';

async function addPostImage(postImage: PostImageCreationAttributes) {
  return PostImage.create(postImage);
}

async function getPostImage(
  id: PostImageAttributes['id'],
): Promise<PostImage | null> {
  return PostImage.findByPk(id);
}

async function getPostImagesByPostId(
  postId: PostImageAttributes['postId'],
): Promise<PostImage[]> {
  return PostImage.findAll({ where: { postId: postId } });
}

async function deletePostImage(id: PostImageAttributes['id']): Promise<number> {
  return PostImage.destroy({ where: { id: id } });
}

async function deletePostImagesByPostId(
  postId: PostImageAttributes['postId'],
): Promise<number> {
  return PostImage.destroy({ where: { postId: postId } });
}

export default {
  addPostImage,
  getPostImage,
  getPostImagesByPostId,
  deletePostImage,
  deletePostImagesByPostId,
};
