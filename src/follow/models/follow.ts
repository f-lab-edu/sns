import { sequelize } from '../../config/db';
import { DataTypes, Model, Optional } from 'sequelize';

// follower: 나를 팔로우 하는 사람
// follwing: 내가 팔로잉 하는 사람
type FollowAttributes = {
  id: number;
  userId: string; // 팔로우 하는 사람
  targetId: string; // 팔로우 당하는 사람
  createdAt: Date;
  updatedAt: Date;
};

type FollowCreationAttributes = Optional<
  FollowAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class Follow extends Model<FollowAttributes, FollowCreationAttributes> {
  declare id: number;
  declare userId: string;
  declare targetId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      // 팔로우 하는 사람
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetId: {
      // 팔로잉 당하는 사람
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
    modelName: 'Follow',
    timestamps: true,
    indexes: [
      {
        fields: ['userId', 'targetId'],
        unique: true,
      },
    ],
  },
);

export { Follow };
export type { FollowAttributes, FollowCreationAttributes };
