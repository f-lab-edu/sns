import { Follow, FollowCreationAttributes } from '../models/follow';

function addFollow({ userId, targetId }: FollowCreationAttributes) {
  return Follow.create({ userId, targetId });
} // targetId를 팔로우 하는 사람
// userId가 팔로잉 하는 사람
function getFollowings(userId: string) {
  return Follow.findAll({ where: { userId } });
}

function getFollowers(targetId: string) {
  return Follow.findAll({ where: { targetId } });
}

export default { addFollow, getFollowers, getFollowings };
