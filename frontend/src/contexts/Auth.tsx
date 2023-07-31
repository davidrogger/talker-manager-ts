'use client';

import { loginAuth } from '@/services/api';
import { LoginInput } from '@/types';
import { useRouter } from 'next/navigation';
import {
  ReactNode, createContext, useContext, useState,
} from 'react';

type LoggedUser = {
  token?: string;
}

export type IAuthContext = {
  isAuthenticated: boolean;
  loginMsg: string;
  signIn: (login:LoginInput) => Promise<void>;
  setLoginMsg: (phrase:string) => void;
  signOut: () => void;
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

  async function getUserData(token) {
    //
  }

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      router.push('/dashboard');
      setUser({ token });
    }
  }

  async function signOut() {
    router.push('/');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={ {
      isAuthenticated, loginMsg, signIn, setLoginMsg, signOut,
    } }>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
