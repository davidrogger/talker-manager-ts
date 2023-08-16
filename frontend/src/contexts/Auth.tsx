'use client';

import { getUserData, loginAuth } from '@/services/api';
import { LoggedUser, LoginInput } from '@/types';
import { getStoredToken, storeToken } from '@/utils/localStorageHandler';
import { useRouter } from 'next/navigation';
import {
  ReactNode, createContext, useContext, useState,
} from 'react';

export type IAuthContext = {
  isAuthenticated: boolean;
  loginMsg: string;
  signIn: (login:LoginInput) => Promise<void>;
  setLoginMsg: (phrase:string) => void;
  signOut: () => void;
  user: null | LoggedUser;
  authStoredToken: () => Promise<null | { error: unknown }>;
}

export const AuthContext = createContext({} as IAuthContext);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }:AuthProviderProps) {
  const [loginMsg, setLoginMsg] = useState('');
  const [user, setUser] = useState<null | LoggedUser>(null);

  const router = useRouter();

  const isAuthenticated = !!user;

  function signOut() {
    router.push('/');
    localStorage.clear();
    setTimeout(() => setUser(null), 200);
  }

  async function authStoredToken():Promise<null | { error: unknown }> {
    const token = getStoredToken();

    const response = await getUserData(token);
    if (response.user) setUser(response.user);

    if (response.error) {
      localStorage.clear();
      return { error: response.error };
    }

    return null;
  }

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      storeToken(token);
      router.push('/dashboard');
    }
  }

  return (
    <AuthContext.Provider value={ {
      isAuthenticated, loginMsg, signIn, setLoginMsg, signOut, user, authStoredToken,
    } }>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
