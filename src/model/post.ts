import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

type PostColumns = {
  id: number;
  title: string;
  content: string;
  userId: string;
};

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function addPost({ title, content, userId }: PostColumns) {
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

export { addPost, getPost, getAllPosts, getAllPostsByUserId };
