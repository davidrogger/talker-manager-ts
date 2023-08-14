'use client';

import { delay } from '@/services/api';
import { useState, FormEvent, ChangeEvent } from 'react';

type AddNewTalkerProps = {
  openWindow: (state:boolean) => void;
}

export default function AddNewTalker({ openWindow }:AddNewTalkerProps) {
  const [newTalker, setNewTalker] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  async function submitHandle(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await delay(2000);
    console.log(newTalker);
    openWindow(false);
    setIsLoading(false);
  }

  function inputNameHandler(e:ChangeEvent<HTMLInputElement>) {
    const inputTalkerName = e.target.value;
    setNewTalker(inputTalkerName);
    if (inputTalkerName.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  return (
    <div
      className='absolute h-screen w-screen bg-black bg-opacity-80 top-0 left-0 flex justify-center items-center z-0'
    >
      <form
        className='bg-gray-200 rounded p-5 z-10 relative flex justify-center items-baseline h-28 w-96'
        onSubmit={submitHandle}>

          <input
            className='border m-2 p-1 rounded h-10'
            name='talkerName'
            placeholder='Type the name here...'
            type="text"
            value={newTalker}
            onChange={inputNameHandler}
          />

          <button
            className='bg-green-800 disabled:opacity-80 disabled:cursor-not-allowed focus:hover:bg-green-700 rounded p-2 text-white w-20 h-10 flex justify-center items-center'
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading
              ? (<div className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-white'></div>)
              : 'Add'}
          </button>

        <button
          className='text-sm cursor-pointer absolute bottom-0 left-1 text-blue-500 hover:text-blue-300'
          onClick={() => openWindow(false)}
        >
          {'<'} back to the dashboard
        </button>

      </form>
    </div>
  );
}
