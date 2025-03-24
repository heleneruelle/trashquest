import { Form, useNavigation, useNavigate } from '@remix-run/react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import { firebaseErrorCodes } from '../../config';
import i18n from '~/i18n';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import formDataToObject from '~/utils/formDataToObject';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToObject(formData)),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error('User registration failed');
      }

      const email = String(formData.get('email'));
      const password = String(formData.get('password'));

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const idToken = await user.getIdToken(true);

      const tokenValidationResp = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });

      const tokenValidationData = await tokenValidationResp.json();

      if (tokenValidationData.error) {
        throw new Error('Token validation failed');
      }

      return navigate(createCompositeUrl(i18n, '/home'));
    } catch (authError) {
      console.error('Error during user registration:', authError);
      setError(
        authError instanceof Error
          ? authError.message
          : 'User registration failed. Please try again.'
      );
    }
  };

  return (
    <Form ref={formRef} className="form" onSubmit={handleSignUp}>
      <TextField
        label={t('email')}
        type="email"
        name="email"
        required={true}
        placeholder={t('create-new-account.input.placeholder.email')}
        error={error === firebaseErrorCodes.email}
        hint={
          error === firebaseErrorCodes.email
            ? t('create-new-account.input.hint.email-error')
            : undefined
        }
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        required={true}
        placeholder={t('create-new-account.input.placeholder.password')}
        error={error === firebaseErrorCodes.password}
        hint={
          error === firebaseErrorCodes.password
            ? t('create-new-account.input.hint.password-error')
            : undefined
        }
      />
      <TextField
        label={t('create-new-account.input.password-confirm')}
        type="password"
        name="passwordConfirm"
        required={true}
        placeholder={t('create-new-account.input.placeholder.password-confirm')}
        error={error === firebaseErrorCodes.password}
        hint={
          error === firebaseErrorCodes.password
            ? t('create-new-account.input.hint.password-error')
            : undefined
        }
      />
      <TextField
        label={t('username')}
        type="text"
        name="username"
        required={true}
        placeholder={t('create-new-account.input.placeholder.username')}
        hint={t('create-new-account.input.hint.username')}
      />
      <LocationAutoComplete
        hint={t('create-new-account.input.hint.location-error')}
        countryHint={t('create-new-account.input.hint.location')}
      />
      <Button
        type="submit"
        disabled={navigation.state === 'submitting'}
        label={t(
          navigation.state === 'submitting'
            ? 'create-new-account.cta.submitting'
            : 'create-new-account.cta.idle'
        )}
        style="secondary"
      />
    </Form>
  );
};

export default SignUpForm;
