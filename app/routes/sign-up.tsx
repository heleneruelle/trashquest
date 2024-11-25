import SignUpForm from '../components/auth/SignUpForm';
import { signupAction } from '../loaders/signup';

export { signupAction as action };

const SignUpPage = () => {
  return (
    <div>
      <h1>Welcome to TrashQuest !</h1>
      <h3>Your mission to clean up the world starts here!</h3>
      <SignUpForm setUser={() => {}} />
    </div>
  );
};

export default SignUpPage;
