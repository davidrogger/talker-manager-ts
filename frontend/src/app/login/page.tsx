'use client';

import React, { useState } from 'react';

import AnimatedLink from '@/components/AnimatedLink';
import InputPass from '@/components/InputPass';
import InputText from '@/components/InputText';
import WarningMsg from '@/components/WarningMsg';

import { useAuthContext } from '@/contexts/Auth';

import { LoginInput } from '@/types';
import SpinLoading from '@/components/SpinLoading';

export default function Login() {
  const { loginMsg, setLoginMsg, signIn } = useAuthContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  function isFilledOut({ email, password }:LoginInput):boolean {
    return !!email && !!password;
  }

  async function handlerSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const loginInput = Object.fromEntries(formData) as LoginInput;

    if (isFilledOut(loginInput)) {
      await signIn(loginInput);
    } else {
      setLoginMsg('Please you need to fill the email and password');
      setTimeout(() => setLoginMsg(''), 5000);
    }
    setLoading(false);
  }
  return (
    <div
      className="flex justify-center items-center absolute top-0 bg-zinc-100 h-screen w-screen"
    >
      <div
        className="flex flex-col items-center justify-between h-96 w-80 border-2 shadow-md rounded bg-white"
      >
        <h1
          className='text-2xl mt-10'
        >
          Manager Login
        </h1>

        <div className='flex flex-col relative border p-2 rounded'>

          { loginMsg && (
            <WarningMsg
              message={ loginMsg }
            />
          ) }

            <form onSubmit={handlerSubmit}
              className='text-center'
            >
              <InputText
                placeholder='Email'
              />
              <InputPass
                placeholder='Password'
              />
              <button
                type="submit"
                className='relative h-10 bg-gray-400 p-2 w-1/2 m-2 rounded text-white hover:bg-gray-500 active:translate-y-[1px]'
              >
                {isLoading
                  ? <SpinLoading />
                  : 'Enter'}
              </button>
            </form>
        </div>

        <AnimatedLink
          href='/'
          title='Back Home'
          className='self-start m-2 text-blue-500'
        />
      </div>
    </div>
  );
}
