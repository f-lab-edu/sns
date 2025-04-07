import { Post, PostCreationAttributes } from '../models/post';

async function addPost({ title, content, userId }: PostCreationAttributes) {
  return Post.create({ title, content, userId });
}

async function getPost(postId: number) {
  return Post.findByPk(postId);
}

async function getAllPosts(): Promise<unknown>;
async function getAllPosts(condition: object): Promise<unknown>;
async function getAllPosts(condition?: object) {
  return condition ? Post.findAll(condition) : Post.findAll();
}

async function getAllPostsByUserId(userId: string): Promise<unknown> {
  // TODO follow한 모든 유저의 포스트를 가져온다

  return Post.findAll({ where: { userId: userId } });
}

export default { addPost, getPost };
