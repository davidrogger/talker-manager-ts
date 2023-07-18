'use client';

import { useState } from 'react';

import Image from 'next/image';
import openEye from '@/images/openEye.svg';
import closeEye from '@/images/closeEye.svg';

import InputText from './InputText';

type InputTypes = 'password' | 'text';

function InputPass() {
  const [inputType, setInputType] = useState<InputTypes>('password');

  const passIco = {
    password: closeEye,
    text: openEye,
  };

  function passwordTypeChange() {
    const exchange = {
      password: 'text',
      text: 'password',
    };

    setInputType((prev) => exchange[prev] as InputTypes);
  }

  return (
    <div className='relative'>
      <InputText
        placeholder='Password'
        type={inputType}
      />

      <Image
        onClick={passwordTypeChange}
        height={20}
        src={passIco[inputType]}
        alt='reveal and unreveal eye password'
        className='opacity-60 absolute top-2.5 right-2 hover:opacity-100'
      />

    </div>
  );
}

export default InputPass;
