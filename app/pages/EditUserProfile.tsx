import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import EditUserProfileForm from '~/components/forms/EditUserProfileForm';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  user: UserType;
}

function EditUserProfile() {
  const { user } = useLoaderData<LoaderData>();
  const { t } = useTranslation();

  return (
    <TwoColumnsLayout>
      <div className="edit-user-profile-form">
        <h1>{t('user.edit.title')}</h1>
        <h3>{t('user.edit.description')}</h3>
        <EditUserProfileForm user={user} />
      </div>
      <ImageLayout />
    </TwoColumnsLayout>
  );
}

export default EditUserProfile;
