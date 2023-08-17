'use client';

import { ITalker } from '@/types';
import { ChangeEvent, useState } from 'react';
import { updateTalker } from '@/services/api';
import { useDashboardContext } from '@/contexts/Dashboard';

import DeleteTalkerWarning from '@/components/DeleteTalkerWarning';
import EditableModeBtns from '@/components/EditableModeBtns';
import UpdateBtns from '@/components/UpdateBtns';

export default function TalkerRow({ talker }:{ talker: ITalker}) {
  const { loadTalkers } = useDashboardContext();
  const [editorMode, setEditorMode] = useState<boolean>(false);
  const [isDeleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [talkerName, setTalkerName] = useState(talker.name);
  const [isBtnDisabled, setBtnDisable] = useState(true);

  function startEdit() {
    setEditorMode(true);
  }

  function cancelEdit() {
    setTalkerName(talker.name);
    setEditorMode(false);
  }

  async function requestUpdateTalker() {
    await updateTalker({ ...talker, name: talkerName });
    await loadTalkers();
    setEditorMode(false);
  }
  function changeDisplayTalkerName(e:ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    setBtnDisable(talker.name === newName || newName.length < 3);
    setTalkerName(newName);
  }

  async function requestDeleteTalkerById() {
    setDeleteWarning(true);
  }

  return (
    <tr className='text-center [&>*]:border relative z-0'>

      <td className='w-[370px]'>
        {talker.id}
      </td>
      <td className='w-[calc(100%-470px)] [&>*]:w-full [&>*]:text-center'>
        {editorMode
          ? (<input
              className='border'
              type="text" value={talkerName}
              onChange={changeDisplayTalkerName}
            />
          )
          : <span className='text-gray-400'>{talkerName}</span>
        }
      </td>
      <td className='w-[100px]'>
      {editorMode
        ? (
        <EditableModeBtns
          confirmHandle={requestUpdateTalker}
          cancelHandle={cancelEdit}
          isConfirmDisabled={isBtnDisabled}
        />
        )
        : (
        <UpdateBtns
          editHandle={startEdit}
          deleteHandle={requestDeleteTalkerById}
        />
        )}

      { isDeleteWarning && (
      <DeleteTalkerWarning
        talker={talker}
        setDeleteWarning={setDeleteWarning}
      />
      ) }
    </td>
  </tr>
  );
}
