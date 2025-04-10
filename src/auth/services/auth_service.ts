import SessionRepository from '../repositories/session_repository';
import { Session } from '../models/session';

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

export default {
  createSession,
  destroySession,
  getSession,
};
