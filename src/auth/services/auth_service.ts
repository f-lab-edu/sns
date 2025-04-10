import SessionRepository from '../repositories/session_repository';

async function createSession(userId: string) {
  return SessionRepository.addSession({
    userId,
    expiresInMs: 15 * 60 * 1000, // 15분
  });
}

async function destroySession(userId: string) {
  return SessionRepository.deleteSession(userId);
}

export default {
  createSession,
  destroySession,
};
