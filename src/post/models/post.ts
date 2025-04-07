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

export { Post };
export { PostAttributes, PostCreationAttributes };
