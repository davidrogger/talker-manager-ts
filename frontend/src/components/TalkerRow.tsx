'use client';

import edit from '@/images/edit.svg';
import confirm from '@/images/confirm.svg';
import cancel from '@/images/cancel.svg';
import trash from '@/images/trash.svg';

import { ITalker } from '@/types';
import { ChangeEvent, useState } from 'react';
import { updateTalker } from '@/services/api';
import { useDashboardContext } from '@/contexts/Dashboard';
import RequestBtn from './RequestBtn';
import DeleteTalkerWarning from './DeleteTalkerWarning';

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
        ? (<>
        <RequestBtn
          src={confirm}
          alt='confirm'
          onClick={requestUpdateTalker}
          disabled={isBtnDisabled}
        />
        <RequestBtn
          src={cancel}
          alt='cancel'
          onClick={cancelEdit}
        />
      </>
        )
        : (<>
          <RequestBtn
            src={edit}
            alt='edit'
            onClick={startEdit}
          />
          <RequestBtn
            src={trash}
            alt='delete'
            onClick={requestDeleteTalkerById}
          />
        </>
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
