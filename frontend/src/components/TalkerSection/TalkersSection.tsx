'use client';

import { useEffect, useState } from 'react';

import { useDashboardContext } from '@/contexts/Dashboard';

import TalkerRow from '@/components/TalkerSection/TalkerRow';
import SpinLoading from '@/components/SpinLoading';
import AddNewTalker from '@/components/TalkerSection/AddNewTalker';

export default function TalkersSection() {
  const { isLoadingTalkers, displayedTalkers, loadTalkers } = useDashboardContext();

  const [newTalkerVisible, setNewTalkerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isLoadingTalkers) {
      loadTalkers();
    }
  }, [isLoadingTalkers, loadTalkers]);

  function getHeaders():string[] {
    const defaultHeader = {
      id: true,
      name: true,
    };

    const [talker] = displayedTalkers;
    const headers = talker || defaultHeader;

    return Object.keys(headers);
  }

  if (displayedTalkers) {
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
            {isLoadingTalkers
              ? (
                <tr className='relative z-0'>
                  <td className=' h-9'>
                    <SpinLoading color='green' />
                  </td>
                </tr>
              )
              : displayedTalkers.map((talker) => (
                <TalkerRow
                  key={talker.id}
                  talker={talker}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
