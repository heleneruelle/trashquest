import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET must be included in ENV VAR."
  );
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '_session',
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      secrets: [sessionSecret],
      sameSite: 'lax', 
      path: '/',
      httpOnly: true, // Available server side only
    },
  });

export { getSession, commitSession, destroySession };
