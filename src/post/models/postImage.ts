import { sequelize } from '../../config/db';
import { DataTypes, Model, Optional } from 'sequelize';

type PostImageAttributes = {
  id: number;
  url: string;
  postId: number; // post fk. NOTE - 나중에 임시저장(이미지는 업로드 성공, 게시글은 실패) 상태를 추가한다면 null도 허용할 수 있음
  createdAt: Date;
  updatedAt: Date;
};

type PostImageCreationAttributes = Optional<
  PostImageAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class PostImage extends Model<
  PostImageAttributes,
  PostImageCreationAttributes
> {
  declare id: number;
  declare url: string;
  declare postId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PostImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
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
    modelName: 'PostImage',
    timestamps: true,
  },
);

export { PostImage };
export { PostImageAttributes, PostImageCreationAttributes };
