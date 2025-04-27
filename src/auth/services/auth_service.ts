import SessionRepository from '../repositories/session_repository';
import { Session } from '../models/session';

async function findOrCreateSession(userId: string) {
  return SessionRepository.findOrCreate({
    userId,
    expiresInMs: 15 * 60 * 1000, // 15분
  });
}

async function createSession(userId: string) {
  return SessionRepository.addSession({
    userId,
    expiresInMs: 15 * 60 * 1000, // 15분
  });
}

async function destroySession(userId: string) {
  return SessionRepository.deleteSession(userId);
}

async function getSession(sessionId: string): Promise<Session | null> {
  return SessionRepository.getSession(sessionId);
}

async function login(userId: string) {
  const [result, _created] = await findOrCreateSession(userId);
  return result;
}

export default {
  createSession,
  destroySession,
  getSession,
  login,
};
