'use client';

import { getAllTalkers } from '@/services/api';
import { ITalker } from '@/types';
import { getStoredToken } from '@/utils/localStorageHandler';
import { useEffect, useState } from 'react';

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
      age: true,
    };
    return Object.keys(defaultHeader);
  }

  function editHandler(id:string) {
    console.log(id);
  }

  if (talkers) {
    return (
      <div className="border rounded m-4 p-4 hover:shadow-2xl w-11/12">
        <h1 className="text-slate-500 text-center text-2xl mb-10">
          Talkers Management
        </h1>
        <table className='w-full border-separate border rounded'>
          <thead>
            <tr>
              {getHeaders()
                .map((thead, index) => (<th key={index}>{thead}</th>))}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
              {talkers.map(({ id, name, age }) => (
                <tr key={id} className='text-center [&>*]:border'>
                  <td className='w-[40%]'>{id}</td>
                  <td className='w-[30%]'>{name}</td>
                  <td className='w-[10%]'>{age}</td>
                  <td className='w-[20%]'>
                    <button
                      onClick={() => editHandler(id)}
                    >
                      edit
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
