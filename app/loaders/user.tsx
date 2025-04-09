import userMock from '~/mock/user.json';

async function userLoader() {
  return Response.json({ success: true, user: userMock });
}

export default userLoader;
