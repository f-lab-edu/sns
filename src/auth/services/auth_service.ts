import { Session } from '../models/session';

async function createSession(userId: string) {
  const result = await Session.create({
    userId,
    expiresInMs: 15 * 60 * 1000, // 15분
  });

  return result;
}

export default {
  createSession,
};
