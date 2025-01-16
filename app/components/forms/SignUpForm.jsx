import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import { firebaseErrorCodes } from '../../config';

const SignUpForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const { t } = useTranslation();

  return (
    <Form method="post" className="form">
      <TextField
        label={t('email')}
        type="email"
        name="email"
        required={true}
        placeholder={t('create-new-account.input.placeholder.email')}
        error={actionData?.error === firebaseErrorCodes.email}
        hint={
          actionData?.error === firebaseErrorCodes.email &&
          t('create-new-account.input.hint.email-error')
        }
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        required={true}
        placeholder={t('create-new-account.input.placeholder.password')}
        error={actionData?.error === firebaseErrorCodes.password}
        hint={
          actionData?.error === firebaseErrorCodes.password &&
          t('create-new-account.input.hint.password-error')
        }
      />
      <TextField
        label={t('create-new-account.input.password-confirm')}
        type="password"
        name="password-confirm"
        required={true}
        placeholder={t('create-new-account.input.placeholder.password-confirm')}
        error={actionData?.error === firebaseErrorCodes.password}
        hint={
          actionData?.error === firebaseErrorCodes.password &&
          t('create-new-account.input.hint.password-error')
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
      <LocationAutoComplete />
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
