import { LinksFunction } from '@remix-run/node';
import { signupAction } from '~/loaders/signup';
import SignUpPage from '~/pages/SignUp';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/signup.css' },
  ];
};

export { signupAction as action };

export default SignUpPage;
