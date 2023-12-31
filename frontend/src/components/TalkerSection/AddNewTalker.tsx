'use client';

import { useDashboardContext } from '@/contexts/Dashboard';
import { addNewTalkerByName } from '@/services/api';
import { useState, FormEvent, ChangeEvent } from 'react';
import SpinLoading from '../SpinLoading';

type AddNewTalkerProps = {
  openWindow: (state:boolean) => void;
}

export default function AddNewTalker({ openWindow }:AddNewTalkerProps) {
  const { setLoadingTalkers } = useDashboardContext();
  const [talkerName, setTalkerName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  async function submitHandle(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setButtonDisabled(true);
    setIsLoading(true);

    await addNewTalkerByName(talkerName);

    setIsLoading(false);
    openWindow(false);
    setLoadingTalkers(true);
  }

  function inputNameHandler(e:ChangeEvent<HTMLInputElement>) {
    const inputTalkerName = e.target.value;
    setTalkerName(inputTalkerName);
    if (inputTalkerName.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  return (
    <div
      className='absolute h-screen w-screen bg-black bg-opacity-80 top-0 left-0 flex justify-center items-center z-10'
    >
      <form
        className='bg-gray-200 rounded p-5 z-10 relative flex justify-center h-28 w-96'
        onSubmit={submitHandle}>

          <input
            className='border m-1 p-2 rounded h-10'
            name='talkerName'
            placeholder='Type the name here...'
            type="text"
            value={talkerName}
            onChange={inputNameHandler}
          />

          <button
            className='relative bg-green-800 disabled:opacity-80 disabled:cursor-not-allowed focus:hover:bg-green-700 rounded p-2 m-1 text-white w-20 h-10 flex justify-center items-center'
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading
              ? (<SpinLoading />)
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
