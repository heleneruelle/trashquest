import { Form, useNavigation, useNavigate } from '@remix-run/react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import Toast from '../notifications/Toast';
import { auth } from '../../firebaseConfig';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

const LoginForm = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      //setError('Veuillez remplir tous les champs');
      setError(true);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = await user.getIdToken(true);

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        setError(true);
        return;
      }

      return navigate(createCompositeUrl(i18n, '/home'));
    } catch (err) {
      //setError('Erreur de connexion : ' + err.message);
      setError(true);
      return;
    }
  };

  return (
    <Form ref={formRef} className="form" onSubmit={handleLogin}>
      {error && (
        <Toast
          type="error"
          message={t('login.error')}
          callback={() => setError(false)}
        />
      )}
      <TextField
        label={t('email')}
        type="email"
        name="email"
        placeholder={t('login.placeholder.email')}
        error={error}
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        placeholder={t('login.placeholder.password')}
        error={error}
      />
      <Button type="submit" disabled={navigation.state === 'submitting'}>
        {t(
          navigation.state === 'submitting'
            ? 'login.cta.submitting'
            : 'login.cta.idle'
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
