import FollowRepository from '../repositories/follow_repository';
import { FollowCreationAttributes } from '../models/follow';

async function addFollow({ userId, targetId }: FollowCreationAttributes) {
  // Review - 이미 DB에서 중복으로 추가시 오류를 반환하는데, 서비스 코드에서 방어 로직이 필요할지 의문입니다. 오히려 DB에 중복으로 접근하니 효율이 떨어지지 않을까요?
  const followings = await getFollowings(userId);
  if (followings.find((follow) => follow.targetId === targetId)) {
    throw new Error('ALREADY_FOLLOW');
  }

  return FollowRepository.addFollow({ userId, targetId });
}

async function getFollowings(userId: string) {
  return FollowRepository.getFollowings(userId);
}

async function getFollowers(userId: string) {
  return FollowRepository.getFollowers(userId);
}

export default {
  addFollow,
  getFollowings,
  getFollowers,
};
