import { Session } from '../models/session';

async function createSession(userId: string) {
  const result = await Session.create({
    userId,
    expiresInMs: 15 * 60 * 1000, // 15분
  });

  return result;
}

async function destroySession(userId: string) {
  const result = await Session.destroy({ where: { userId: userId } });
  return result;
}

export default {
  createSession,
  destroySession,
};
