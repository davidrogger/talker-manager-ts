'use client';

import { getAllTalkers } from '@/services/api';
import { ITalker } from '@/types';
import { getStoredToken } from '@/utils/localStorageHandler';
import { useEffect, useState } from 'react';

import editImg from '@/images/edit.svg';
import Image from 'next/image';

export default function TalkersSection() {
  const [talkers, setTalkers] = useState<ITalker[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    getAllTalkers(token as string)
      .then((response) => setTalkers(response.talkers || []));
  }, []);

  function getHeaders():string[] {
    const defaultHeader = {
      id: true,
      name: true,
    };
    return Object.keys(defaultHeader);
  }

  function editHandler(id:string) {
    console.log(id);
  }

  if (talkers) {
    return (
      <div className="border rounded m-4 p-4 w-11/12">
        <h1 className="text-slate-500 text-center text-2xl mb-10">
          Talkers Management
        </h1>
        <table className='w-full border-separate border rounded'>
          <thead>
            <tr>
              {getHeaders()
                .map((thead, index) => (<th key={index}>{thead}</th>))}
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
              {talkers.map(({ id, name }) => (
                <tr key={id} className='text-center [&>*]:border'>
                  <td className='w-[370px]'>{id}</td>
                  <td className='w-[calc(100%-420px)]'>{name}</td>
                  <td className='w-[50px]'>
                    <button
                      className='p-1 active:translate-y-0.5'
                      onClick={() => editHandler(id)}
                    >
                    <Image
                      src={editImg}
                      alt='edit-content'
                    />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
