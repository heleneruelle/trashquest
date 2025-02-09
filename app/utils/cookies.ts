import { serialize, parse } from 'cookie';

export function setCookie(name: string, value: string, options = {}) {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    ...options,
  });
}

export function getCookie(request: Request, name: string) {
  const cookies = parse(request.headers.get('Cookie') || '');
  return cookies[name];
}

export function destroyCookie(name: string) {
  return serialize(name, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: -1,
  });
}
