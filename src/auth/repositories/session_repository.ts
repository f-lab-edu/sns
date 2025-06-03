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

async function getSession(sessionId: string): Promise<Session | null> {
  return Session.findByPk(sessionId);
}

async function getSessionsByUser(userId: string) {
  return Session.findAll({ where: { userId: userId } });
}

async function findOrCreate({
  userId,
  expiresInMs,
}: SessionCreationAttributes): Promise<[Session, boolean]> {
  return Session.findOrCreate({
    where: { userId: userId },
    defaults: { userId, expiresInMs },
  });
}

export default {
  addSession,
  deleteSession,
  getSession,
  findOrCreate,
  getSessionsByUser,
};
