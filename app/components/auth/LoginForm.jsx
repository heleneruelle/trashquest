import { Form, useActionData, useNavigation, Link } from '@remix-run/react';
import createCompositeUrl from '../../utils/url/createCompositeUrl';
import i18n from '../../i18n';

const LoginForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();

  return (
    <div>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
      <Form method="post">
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Authentication...' : 'Login'}
        </button>
      </Form>
      <a href={createCompositeUrl(i18n, '/sign-up')}>Create new account</a>
    </div>
  );
};

export default LoginForm;
