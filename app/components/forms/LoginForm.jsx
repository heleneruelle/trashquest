import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import Toast from '../notifications/Toast';

const LoginForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();

  const { t } = useTranslation();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (actionData?.error && !showError) {
      setShowError(true);
    }
  }, [actionData]);

  return (
    <Form method="post" className="form">
      {showError && (
        <Toast
          type="error"
          message={t('login.error')}
          callback={() => setShowError(false)}
        />
      )}
      <TextField
        label={t('email')}
        type="email"
        name="email"
        placeholder={t('login.placeholder.email')}
        error={showError}
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        placeholder={t('login.placeholder.password')}
        error={showError}
      />
      <Button
        type="submit"
        disabled={navigation.state === 'submitting'}
        label={t(
          navigation.state === 'submitting'
            ? 'login.cta.submitting'
            : 'login.cta.idle'
        )}
      />
    </Form>
  );
};

export default LoginForm;
