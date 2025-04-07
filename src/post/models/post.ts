import { sequelize } from '../../config/db';
import { DataTypes, Model, Optional } from 'sequelize';

type PostAttributes = {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type PostCreationAttributes = Optional<
  PostAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare title: string;
  declare content: string;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Post.init(
  {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  },
);

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

export { addPost, getPost, getAllPosts, getAllPostsByUserId };
