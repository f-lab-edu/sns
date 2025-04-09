import {
  Post,
  PostCreationAttributes,
  PostUpdateAttributes,
} from '../models/post';

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

async function updatePost(
  //https://sequelize.org/docs/v7/querying/update/#updating-a-row-using-modelupdate
  postAttributes: PostUpdateAttributes,
): Promise<Post> {
  // NOTE - 조회 -> 수정 -> 조회 로직상 문제가 발생하지 않을지 고민 (과다한 조회 등)
  const { id, ...updateData } = postAttributes;
  const post = await getPost(id);
  if (!post) {
    throw new Error('Post Not Found');
  }

  post.set(updateData);
  await post.save();
  await post.reload();
  return post;
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
  updatePost,
};
