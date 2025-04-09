import { useLoaderData } from '@remix-run/react';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  user: UserType;
}

function User() {
  const { user } = useLoaderData<LoaderData>();

  const { country, location, username } = user;

  return (
    <div>
      <h1>{username}</h1>
      <p>{country}</p>
      <p>{JSON.stringify(location)}</p>
    </div>
  );
}

export default User;
