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
  },
);

function addFollow({ userId, targetId }: FollowAttributes) {
  return Follow.create({ userId, targetId });
}

// userId가 팔로잉 하는 사람
function getFollowings(userId: string) {
  return Follow.findAll({ where: { userId } });
}

// targetId를 팔로우 하는 사람
function getFollowers(targetId: string) {
  return Follow.findAll({ where: { targetId } });
}

export { addFollow, getFollowers, getFollowings };
