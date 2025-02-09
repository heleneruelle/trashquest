import { serialize, parse } from 'cookie';

export function setCookie(name: string, value: string, options = {}) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
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
    sameSite: 'none',
    path: '/',
    maxAge: -1,
  });
}
