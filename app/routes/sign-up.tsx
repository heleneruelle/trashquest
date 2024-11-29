import { signupAction } from '~/loaders/signup';
import SignUpForm from '~/components/auth/SignUpForm';
import ImageLayout from '~/components/templates/ImageLayout';

export { signupAction as action };

const SignUpPage = () => {
  return (
    <ImageLayout>
      <h1>Welcome to TrashQuest !</h1>
      <h3>Your mission to clean up the world starts here!</h3>
      <SignUpForm />
    </ImageLayout>
  );
};

export default SignUpPage;
