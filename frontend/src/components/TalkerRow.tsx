'use client';

import edit from '@/images/edit.svg';
import confirm from '@/images/confirm.svg';
import cancel from '@/images/cancel.svg';
import trash from '@/images/trash.svg';

import { ITalker } from '@/types';
import { ChangeEvent, useState } from 'react';
import { updateTalker } from '@/services/api';
import TalkerBtn from './TalkerBtn';

export default function TalkerRow({ talker }:{ talker: ITalker}) {
  const [editorMode, setEditorMode] = useState<boolean>(false);
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
    setEditorMode(false);
  }
  function changeDisplayTalkerName(e:ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    setBtnDisable(talker.name === newName || newName.length < 3);
    setTalkerName(newName);
  }

  async function requestDeleteTalkerById(id) {
    console.log(id);
  }

  return (
    <tr className='text-center [&>*]:border'>
      <td className='w-[370px]'>{talker.id}</td>
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
        <TalkerBtn
          src={confirm}
          alt='confirm'
          onClick={requestUpdateTalker}
          disabled={isBtnDisabled}
        />
        <TalkerBtn
          src={cancel}
          alt='cancel'
          onClick={cancelEdit}
        />
      </>
        )
        : (<>
          <TalkerBtn
            src={edit}
            alt='edit'
            onClick={startEdit}
          />
          <TalkerBtn
            src={trash}
            alt='delete'
            onClick={() => requestDeleteTalkerById(talker.id)}
          />
        </>
        )}
    </td>
  </tr>
  );
}
