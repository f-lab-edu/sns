import { Post, PostCreationAttributes } from '../models/post';

async function addPost({
  title,
  content,
  userId,
}: PostCreationAttributes): Promise<Post> {
  return Post.create({ title, content, userId });
}

async function getPost(postId: number): Promise<Post | null> {
  return Post.findByPk(postId);
}

async function getAllPostsByUser(userId: string): Promise<Post[]> {
  return Post.findAll({ where: { userId: userId } });
}

async function getAllPosts(): Promise<unknown>;
async function getAllPosts(condition: object): Promise<unknown>;
async function getAllPosts(condition?: object) {
  return condition ? Post.findAll(condition) : Post.findAll();
}

export default {
  addPost,
  getPost,
  getAllPostsByUser,
};
