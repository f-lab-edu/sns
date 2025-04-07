import FollowRepository from '../repositories/follow_repository';
import { FollowCreationAttributes } from '../models/follow';

async function addFollow({ userId, targetId }: FollowCreationAttributes) {
  return FollowRepository.addFollow({ userId, targetId });
}

export default {
  addFollow,
  // getFollowings,
  // getFollowers,
};
