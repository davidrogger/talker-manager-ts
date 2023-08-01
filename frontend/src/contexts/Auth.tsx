'use client';

import { getUserData, loginAuth } from '@/services/api';
import { LoggedUser, LoginInput } from '@/types';
import { useRouter } from 'next/navigation';
import {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';

const LOCAL_TOKEN_KEY = 'talker-token';

export type IAuthContext = {
  isAuthenticated: boolean;
  loginMsg: string;
  signIn: (login:LoginInput) => Promise<void>;
  setLoginMsg: (phrase:string) => void;
  signOut: () => void;
  user: null | LoggedUser;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function authStoredToken():Promise<void> {
    const token = getStoredToken();

    if (token) {
      const validUser = await getUserData(token);

      if (validUser) {
        setUser(validUser);
      } else {
        router.push('/');
      }
    }
  }

  useEffect(() => {
    authStoredToken();
  }, [authStoredToken]);

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      router.push('/dashboard');
      localStorage.setItem(LOCAL_TOKEN_KEY, JSON.stringify({ token }));
    }
  }

  async function signOut() {
    localStorage.clear();
    router.push('/');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={ {
      isAuthenticated, loginMsg, signIn, setLoginMsg, signOut, user,
    } }>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
