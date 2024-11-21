import {
  Form,
  //useActionData,
  useNavigation,
} from '@remix-run/react';

const LoginForm = ({ setUser }) => {
  const navigation = useNavigation();

  return (
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
  );
};

export default LoginForm;
