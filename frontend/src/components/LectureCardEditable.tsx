'use client';

import EditableModeBtns from '@/components/EditableModeBtns';
import { ILecture, ITalker } from '@/types';
import { normizeDateToDatePicker } from '@/utils/dateHandler';
import {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { getAllTalkers } from '@/services/api';
import LectureBtns from './LectureBtns';

type LectureCardEditableProps = {
  setEditable: Dispatch<SetStateAction<boolean>>
  lecture: ILecture;
}

export default function LectureCardEditable(
  { setEditable, lecture }:LectureCardEditableProps,
) {
  const [isModified, setModified] = useState<boolean>(false);
  const [talkers, setTalkers] = useState<ITalker[]>([]);
  const [lectureInputs, setLecturesInputs] = useState<ILecture>(
    {
      ...lecture,
      watchedAt: normizeDateToDatePicker(lecture.watchedAt),
    },
  );

  useEffect(() => {
    async function loadTalkersName() {
      const response = await getAllTalkers();

      if (response.talkers) {
        setTalkers(response.talkers);
      }
    }
    loadTalkersName();
  }, [talkers]);

  function checkInputModifies() {
    const titleModified = lecture.title !== lectureInputs.title;
    const talkerNameModified = lecture.talkerName !== lectureInputs.talkerName;
    const watchedAtModified = lecture.watchedAt !== lectureInputs.watchedAt;

    setModified(titleModified || talkerNameModified || watchedAtModified);
  }

  function inputChangeHandler(e:ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name;
    setLecturesInputs((old) => ({ ...old, [fieldName]: e.target.value }));
    checkInputModifies();
  }

  async function cancelHandle() {
    setEditable(false);
  }

  async function confirmHandle() {
    console.log(lectureInputs);
  }

  return (
    <>
      <input
        className='w-full text-center text-lg text-red-800 rounded'
        type="text"
        name='title'
        value={lectureInputs.title}
        onChange={inputChangeHandler}
      />

      <select
        className='w-full text-center rounded'
        name="talkerName"
        value='f55a0429-e03a-4fdb-bffa-071ccb1a5a1a'
        id="talkerName"
      >
        {talkers.map((talker) => (
          <option key={talker.id} value={talker.id}>{talker.name}</option>
        ))}
      </select>

      <input
        className='w-32 text-center rounded'
        type="date"
        name='watchedAt'
        data-testid='date-picker'
        value={lectureInputs.watchedAt}
        onChange={inputChangeHandler}
      />

      <LectureBtns>
        <EditableModeBtns
            confirmHandle={confirmHandle}
            cancelHandle={cancelHandle}
            isConfirmDisabled={isModified}
          />
      </LectureBtns>
    </>
  );
}
