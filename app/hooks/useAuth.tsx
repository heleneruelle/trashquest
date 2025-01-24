import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Met à jour l'état avec l'utilisateur authentifié (ou null si non connecté)
      setLoading(false); // Une fois l'état chargé, on n'est plus en mode "loading"
    });

    return () => unsubscribe(); // Nettoyage pour éviter les fuites de mémoire
  }, []);

  return { user, loading };
};

export default useAuth;
