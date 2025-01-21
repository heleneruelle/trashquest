import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be included in ENV VAR.');
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

export async function getUser(request) {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  if (!userId) {
    return null; // No user in session
  }

  // Optionally, fetch more user info from Firebase or database if needed
  return { userId }; // You can return the user object with more data if necessary
}

export { getSession, commitSession, destroySession };
