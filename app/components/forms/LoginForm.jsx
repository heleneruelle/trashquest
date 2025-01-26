import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import Button from '../inputs/Button';
import Toast from '../notifications/Toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const formRef = useRef(null);

  const { t } = useTranslation();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (actionData?.error && !showError) {
      setShowError(true);
    }
  }, [actionData]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current); // Utilisation de FormData pour récupérer les valeurs des champs

    // Récupérer les valeurs des inputs à partir de formData
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Appel à Firebase pour se connecter
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Utilisateur connecté');
      // Rediriger ou effectuer d'autres actions après la connexion
    } catch (err) {
      setError('Erreur de connexion : ' + err.message);
      console.error('Erreur de connexion:', err.message);
    }
  };

  return (
    <Form ref={formRef} className="form" onSubmit={handleLogin}>
      {showError && (
        <Toast
          type="error"
          message={t('login.error')}
          callback={() => setShowError(false)}
        />
      )}
      <TextField
        label={t('email')}
        type="email"
        name="email"
        placeholder={t('login.placeholder.email')}
        error={showError}
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        placeholder={t('login.placeholder.password')}
        error={showError}
      />
      <Button
        type="submit"
        disabled={navigation.state === 'submitting'}
        label={t(
          navigation.state === 'submitting'
            ? 'login.cta.submitting'
            : 'login.cta.idle'
        )}
      />
    </Form>
  );
};

export default LoginForm;
