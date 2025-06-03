import PostImageRepository from '../repositories/post_image_repository';
import { PostImage, PostImageAttributes } from '../models/post_image';

async function uploadImage(): Promise<string> {
  const url = '';
  return url;
}

/**
 * 이미지를 업로드하고 PostImage를 생성한다
 * @param postId
 */
function createPostImage(
  postId: PostImageAttributes['postId'],
): Promise<PostImage>;

/**
 * 제공된 url로 PostImage를 생성한다
 * @param postId
 * @param url 게시글에 올릴 이미지 url
 */
function createPostImage(
  postId: PostImageAttributes['postId'],
  url: PostImageAttributes['url'],
): Promise<PostImage>;

async function createPostImage(
  postId: PostImageAttributes['postId'],
  url?: PostImageAttributes['url'],
) {
  const _url = url ?? (await uploadImage());

  return await PostImageRepository.addPostImage({
    postId: postId,
    url: _url,
  });
}

export default {
  uploadImage,
  createPostImage,
};
