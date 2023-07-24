'use client';

import { loginAuth } from '@/services/api';
import { LoginInput } from '@/types';
import { useRouter } from 'next/navigation';
import {
  ReactNode, createContext, useContext, useState,
} from 'react';

type IAuthContext = {
  isAuthenticated: boolean;
  loginMsg: string;
  signIn: (login:LoginInput) => Promise<void>;
  setLoginMsg: (phrase:string) => void;
}

const Context = createContext({} as IAuthContext);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }:AuthProviderProps) {
  const [loginMsg, setLoginMsg] = useState('');
  const [user, setUser] = useState(null);

  const isAuthenticated = false;
  const router = useRouter();

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      console.log('talker-cookies', token);
      router.push('/dashboard');
    }
  }

  return (
    <Context.Provider value={ {
      isAuthenticated, loginMsg, signIn, setLoginMsg,
    } }>
      { children }
    </Context.Provider>
  );
}

export const useAuthContext = () => useContext(Context);
