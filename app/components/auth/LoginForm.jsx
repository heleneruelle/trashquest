import { Form, useActionData, useNavigation, Link } from '@remix-run/react';
import createCompositeUrl from '../../utils/url/createCompositeUrl';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
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
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {t(
            navigation.state === 'submitting'
              ? 'login.cta.submitting'
              : 'login.cta.idle'
          )}
        </button>
      </Form>
      <Link to={createCompositeUrl(i18n, '/sign-up')}>
        {t('create-new.cta')}
      </Link>
    </div>
  );
};

export default LoginForm;
