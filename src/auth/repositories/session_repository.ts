import { Session, SessionCreationAttributes } from '../models/session';

async function addSession({
  userId,
  expiresInMs,
}: SessionCreationAttributes): Promise<Session> {
  return Session.create({ userId, expiresInMs });
}

async function deleteSession(userId: string): Promise<number> {
  return Session.destroy({ where: { userId: userId } });
}

export default {
  addSession,
  deleteSession,
};
