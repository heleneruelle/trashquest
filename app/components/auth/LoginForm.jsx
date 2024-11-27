import {
  Form,
  //useActionData,
  useNavigation,
} from '@remix-run/react';

const LoginForm = () => {
  const navigation = useNavigation();

  return (
    <div>
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
      <a href="/sign-up">Create new account</a>
    </div>
  );
};

export default LoginForm;
