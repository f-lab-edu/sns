import { sequelize } from '../config/db';
import { DataTypes } from 'sequelize';

// follower: 나를 팔로우 하는 사람
// follwing: 내가 팔로잉 하는 사람

type FollowColumns = {
  id: number;
  userId: string; // 팔로우 하는 사람
  targetId: string; // 팔로우 당하는 사람
};

const Follow = sequelize.define('Follow', {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function addFollow({ userId, targetId }: FollowColumns) {
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
