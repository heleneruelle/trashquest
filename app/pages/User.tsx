import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  user: UserType;
}

function User() {
  const { user } = useLoaderData<LoaderData>();
  const { t } = useTranslation();

  const { country, username } = user || {};

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <img
          src="/assets/default-avatar.webp"
          style={{ height: '75px', width: '75px' }}
        />
        <h1>{username}</h1>
      </div>
      <p>{t(`countries.${country}`)}</p>
    </div>
  );
}

export default User;
