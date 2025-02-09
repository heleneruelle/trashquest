import { destroyCookie } from '~/utils/cookies';

const logoutAction = async () => {
  try {
    const cookieHeader = destroyCookie('firebase_token');

    const headers = new Headers();
    headers.append(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    headers.append('Set-Cookie', cookieHeader);

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.log('Error during logout:', error);
    return Response.json({ error: `${error}` }, { status: 500 });
  }
};

export default logoutAction;
