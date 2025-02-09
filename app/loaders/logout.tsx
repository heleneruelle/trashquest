import { destroyCookie } from '~/utils/cookies';

const logoutAction = async () => {
  try {
    return new Response('Logout successful', {
      headers: {
        'Set-Cookie': destroyCookie('firebase_token'),
      },
    });
  } catch (error) {
    console.log('Error during logout:', error);
    return Response.json({ error: `${error}` }, { status: 500 });
  }
};

export default logoutAction;
