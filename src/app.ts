// @ts-nocheck

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB, syncDB } from './config/db';

import userRouter from './users/routes';
import postRouter from './post/routes';
import followRouter from './follow/routes';
import newsfeedRouter from './newsfeed/routes';
import authRouter from './auth/routes';

import AuthService from './auth/services/auth_service';
import { Session } from './auth/models/session';

const app = express();
const port = 3333;

initDB();

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' });
  res.end('hello world!!!!');
});

app.listen(port, () => {
  console.log('start server');
});

app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
apiRouter.use(validateSessionMiddleware);

async function validateSessionMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const session = await AuthService.getSession(sessionId);
  if (!session || isExpired(session)) {
    return res.status(401).json({ error: 'Session expired' });
  }

  if (shouldRefresh(session)) {
    session.updatedAt = Date.now();
    await session.save();
  }

  req.userId = session.userId;

  return next();

  function isExpired(session: Session) {
    return (
      Date.now() > session.expiresInMs + new Date(session.updatedAt).getTime()
    );
  }

  function shouldRefresh(session: Session) {
    return (
      new Date(session.updatedAt).getTime() - Date.now() <
      session.expiredInMs / 2
    );
  }
}

apiRouter.use('/posts', postRouter);
apiRouter.use('/follow', followRouter);
apiRouter.use('/newsfeed', newsfeedRouter);

app.use('/api/auth', authRouter); // 세션 검증 없음
app.use('/api/users', userRouter); // 세션 검증 없음
app.use('/api', apiRouter); // 세션 검증 있음

async function initDB() {
  await connectDB();
  await syncDB(); // 개발환경에서만 사용
}
