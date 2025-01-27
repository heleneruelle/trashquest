import { Form, useNavigation, useNavigate } from '@remix-run/react';
import { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '~/firebaseConfig';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import { firebaseErrorCodes } from '../../config';
import i18n from '~/i18n';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

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

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const passwordConfirm = String(formData.get('password-confirm'));

    if (password !== passwordConfirm) {
      setError(firebaseErrorCodes.password);
      return;
    }

    const username = String(formData.get('username'));
    const locationName = String(formData.get('locationName'));
    const locationId = String(formData.get('locationId'));
    const locationLatitude = Number(formData.get('locationLatitude'));
    const locationLongitude = Number(formData.get('locationLongitude'));
    const country = String(formData.get('country'));

    if (!locationId) {
      setError(firebaseErrorCodes.location);
      return;
    }

    let user;
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        user = userCredential.user;
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          username,
          country,
          location: {
            name: locationName,
            id: locationId,
            latitude: locationLatitude,
            longitude: locationLongitude,
          },
          createdAt: serverTimestamp(),
        });

        return navigate(createCompositeUrl(i18n, '/'));
      } catch (firestoreError) {
        // If Firestore document creation fails, delete the authenticated user
        console.error('Error adding user to Firestore:', firestoreError);

        try {
          await deleteUser(user);
        } catch (rollbackError) {
          console.error(
            'Failed to rollback user from Firebase Authentication:',
            rollbackError
          );
        }

        throw new Error(
          'Failed to complete user registration. Please try again.'
        );
      }
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
        name="password-confirm"
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
