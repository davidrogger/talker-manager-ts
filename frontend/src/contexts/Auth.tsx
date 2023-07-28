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
  const [user, setUser] = useState<null | LoggedUser>(null);

  const router = useRouter();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: LoginInput) {
    const { token, error } = await loginAuth({ email, password });

    if (error) {
      setLoginMsg(error.message);
    }

    if (token) {
      console.log('talker-cookies', token);
      router.push('/dashboard');
      setUser({ token });
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
