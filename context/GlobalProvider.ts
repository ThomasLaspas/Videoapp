import { useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

interface AuthState {
  isLogged: boolean;
  loading: boolean;
}

const useAuth = (): { authState: AuthState; user: any } => {
  const [authState, setAuthState] = useState<AuthState>({ isLogged: false, loading: true });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setAuthState({ isLogged: true, loading: false });
          setUser(res);
        } else {
          setAuthState({ isLogged: false, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthState({ isLogged: false, loading: false });
      });
  }, []);

  return { authState, user };
};

export default useAuth;
