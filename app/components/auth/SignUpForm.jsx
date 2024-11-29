import {
  Form,
  useActionData,
  //useActionData,
  useNavigation,
} from '@remix-run/react';

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
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Location:
          <input type="text" name="location" required />
        </label>
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Registering...' : 'Register'}
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
