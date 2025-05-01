import { sequelize } from '../../config/db';
import { DataTypes, Model, Optional } from 'sequelize';

type PostAttributes = {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  images?: string[]; // REVIEW - 사진이 없는 상태를 null로 할지, 빈 배열로 할지, undefined로 할지 고민
};

type PostCreationAttributes = Optional<
  PostAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'images'
>;

type PostUpdateAttributes = Partial<
  Omit<PostAttributes, 'createdAt' | 'updatedAt'>
> & { userId: string; id: number };

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare title: string;
  declare content: string;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  // REVIEW - 이미지 url을 배열로 가지고 있는게 적합할지?
  // 배열을 가지고 있는게 데이터베이스 정규화에 적합한거같지는 않음
  // 정규화를 만족하도록 하려면 image 필드로 변경하여 한번에 한개의 값만 가지도록 하고, 같은 postId에 대해서 여러 row를 추가해야 함
  // 하지만 그렇게 하면 pk인 id가 pk로서의 역할을 상실하게 됨
  declare images?: string[];
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
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    timestamps: true,
  },
);

export { Post };
export { PostAttributes, PostCreationAttributes, PostUpdateAttributes };
