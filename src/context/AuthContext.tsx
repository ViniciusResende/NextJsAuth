import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { signInRequest, recoveryUserInformation } from '../services/auth';
import { api } from '../services/api';

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

interface AuthenticatedProps {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthenticatedProps);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth-token': token } = parseCookies();

    // const token = cookies['nextauth-token']

    if (token) {
      recoveryUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'nextauth-token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
