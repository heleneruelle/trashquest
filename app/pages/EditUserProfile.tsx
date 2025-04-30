import { useLoaderData } from '@remix-run/react';
import EditUserProfileForm from '~/components/forms/EditUserProfileForm';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  user: UserType;
}

function EditUserProfile() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div>
      <EditUserProfileForm user={user} />
    </div>
  );
}

export default EditUserProfile;
