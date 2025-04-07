import FollowRepository from '../repositories/follow_repository';
import { FollowCreationAttributes } from '../models/follow';

async function addFollow({ userId, targetId }: FollowCreationAttributes) {
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
