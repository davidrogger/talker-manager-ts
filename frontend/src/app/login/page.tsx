'use client';

import AnimatedLink from '@/components/AnimatedLink';
import InputPass from '@/components/InputPass';
import InputText from '@/components/InputText';
import WarningMsg from '@/components/WarningMsg';
import React, { useState } from 'react';

type LoginInput = {
  email: string,
  password: string,
}

export default function Login() {
  const [warning, setWarning] = useState<string>('');

  function isFilledOut({ email, password }:LoginInput):boolean {
    return !!email && !!password;
  }

  function handlerSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const loginInput = Object.fromEntries(formData);
    if (isFilledOut(loginInput as LoginInput)) {
      // Not Implemted yet
    } else {
      setWarning('Please you need to fill the email and password');
      setTimeout(() => setWarning(''), 5000);
    }
  }
  return (
    <div
      className="flex justify-center items-center absolute top-0 bg-zinc-100 h-screen w-screen bg-opacity-80"
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

          { warning && (
            <WarningMsg
              message='Please you need to fill the email and password'
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
                className='bg-gray-400 p-2 w-1/2 m-2 rounded text-white hover:bg-gray-500 active:translate-y-[1px]'
              >
                Enter
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
