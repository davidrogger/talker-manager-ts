'use client';

import { getAllTalkers } from '@/services/api';
import { ITalker } from '@/types';
import { getStoredToken } from '@/utils/localStorageHandler';
import { useEffect, useState } from 'react';

import TalkerRow from './TalkerRow';
import AddNewTalker from './AddNewTalker';

export default function TalkersSection() {
  const [talkers, setTalkers] = useState<ITalker[]>([]);
  const [newTalkerVisible, setNewTalkerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!newTalkerVisible) {
      const token = getStoredToken();
      getAllTalkers(token as string)
        .then((response) => setTalkers(response.talkers || []));
    }
  }, [newTalkerVisible]);

  function getHeaders():string[] {
    const defaultHeader = {
      id: true,
      name: true,
    };
    return Object.keys(defaultHeader);
  }

  if (talkers) {
    return (
      <div className="border rounded m-4 p-4 w-11/12">
        <h1 className="text-slate-500 text-center text-2xl mb-10">
          Talkers Management
        </h1>

        <button
          className="bg-green-900 hover:bg-green-700 text-white p-2 rounded-t active:translate-y-0.5"
          onClick={() => setNewTalkerVisible(true)}
        >
          Add New Talker
        </button>

        {newTalkerVisible && <AddNewTalker openWindow={setNewTalkerVisible} />}

        <table className='w-full border-separate border rounded'>
          <thead>
            <tr>
              {getHeaders()
                .map((thead, index) => (<th key={index}>{thead}</th>))}
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
              {talkers.map((talker) => (
                <TalkerRow key={talker.id} talker={talker} />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
