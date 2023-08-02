'use client';

import { getUserData, loginAuth } from '@/services/api';
import { LoggedUser, LoginInput } from '@/types';
import { useRouter } from 'next/navigation';
import {
  ReactNode, createContext, useContext, useState,
} from 'react';

const LOCAL_TOKEN_KEY = 'talker-token';

export type IAuthContext = {
  isAuthenticated: boolean;
  loginMsg: string;
  signIn: (login:LoginInput) => Promise<void>;
  setLoginMsg: (phrase:string) => void;
  signOut: () => void;
  user: null | LoggedUser;
  authStoredToken: () => void;
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

  function getStoredToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    router.push('/');
  }

  async function authStoredToken():Promise<void> {
    const token = getStoredToken();
    const userData = await getUserData(token);

    if (userData) {
      setUser(userData);
    } else {
      router.push('/');
    }
  }

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      localStorage.setItem(LOCAL_TOKEN_KEY, token);
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
