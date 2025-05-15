import { Form, useNavigation, useNavigate } from '@remix-run/react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import ButtonLink from '../inputs/ButtonLink';
import Toast from '../notifications/Toast';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import formDataToObject from '~/utils/formDataToObject';
import i18n from '~/i18n';
import UserType from '~/types/user';

const EditUserProfileForm = ({ user }: { user: UserType }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [error, setError] = useState('');

  const { location, username, country, id: userId } = user;
  const { name, coordinates, id } = location;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(`/api/edit-user-profile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToObject(formData)),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error('User profile update failed');
      }

      return navigate(createCompositeUrl(i18n, `/user/${userId}`));
    } catch (authError) {
      console.error('Error during user profile update:', authError);
      setError(t('user.edit.error'));
    }
  };

  return (
    <Form ref={formRef} className="form" onSubmit={handleUpdateProfile}>
      {error ? (
        <Toast
          message={error}
          callback={() => {
            setError('');
          }}
          type="error"
        />
      ) : null}
      <TextField
        label={t('username')}
        type="text"
        name="username"
        required={true}
        placeholder={t('create-new-account.input.placeholder.username')}
        hint={t('create-new-account.input.hint.username')}
        defaultValue={username}
      />
      <LocationAutoComplete
        hint={t('create-new-account.input.hint.location-error')}
        countryHint={t('create-new-account.input.hint.location')}
        defaultLocation={{
          id: id,
          properties: {
            name: name,
            full_address: name,
            coordinates: {
              latitude: coordinates._latitude,
              longitude: coordinates._longitude,
            },
          },
        }}
        defaultCountry={country}
      />
      <div className="edit-user-ctas">
        <ButtonLink target={createCompositeUrl(i18n, `/user/${userId}`)}>
          {t('quit')}
        </ButtonLink>
        <Button
          type="submit"
          disabled={navigation.state === 'submitting'}
          style="secondary"
          id="signup-form-submit"
        >
          {t(
            navigation.state === 'submitting'
              ? 'user.edit.cta.submitting'
              : 'user.edit.cta.idle'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default EditUserProfileForm;
