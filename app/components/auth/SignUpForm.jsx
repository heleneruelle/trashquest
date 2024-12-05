import {
  Form,
  useActionData,
  //useActionData,
  useNavigation,
} from '@remix-run/react';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();

  const { t } = useTranslation();

  return (
    <div>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
      <Form method="post" className="form">
        <label>
          {t('email')}
          <input type="email" name="email" required />
        </label>
        <label>
          {t('password')}
          <input type="password" name="password" required />
        </label>
        <label>
          {t('username')}
          <input type="text" name="username" required />
        </label>
        <label>
          {t('location')}
          <input type="text" name="location" required />
        </label>
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Registering...' : 'Register'}
        </button>
      </Form>
    </div>
  );
};

export default SignUpForm;
