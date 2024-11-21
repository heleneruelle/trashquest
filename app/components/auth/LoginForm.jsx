// app/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginForm = ({ setUser }) => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the user in state
      setEmail('');
      setPassword('');
      setMessage(`Welcome back: ${userCredential.user.email}`);
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage(`Account created for: ${userCredential.user.email}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button type="submit">Log In</button>
      <button onClick={handleCreateAccount} type="button">
          Create Account
      </button>
    </form>
  );
};

export default LoginForm;
