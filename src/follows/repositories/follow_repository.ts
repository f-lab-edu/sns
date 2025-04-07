import { Follow, FollowAttributes } from '../models/follow';

export function addFollow({ userId, targetId }: FollowAttributes) {
  return Follow.create({ userId, targetId });
} // targetId를 팔로우 하는 사람
// userId가 팔로잉 하는 사람
export function getFollowings(userId: string) {
  return Follow.findAll({ where: { userId } });
}

export function getFollowers(targetId: string) {
  return Follow.findAll({ where: { targetId } });
}

export default { addFollow, getFollowers, getFollowings };
