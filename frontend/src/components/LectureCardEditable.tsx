'use client';

import EditableModeBtns from '@/components/EditableModeBtns';
import { ILecture, ITalker, LectureFields } from '@/types';
import { normalizeDateToApiResponse, normizeDateToDatePicker } from '@/utils/dateHandler';
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

  function checkInputModifies(updatedField:LectureFields, newValue:string) {
    if (updatedField === LectureFields.watchedAt) {
      const newDateNormalized = normalizeDateToApiResponse(newValue);
      setModified(
        lecture[LectureFields[updatedField]] !== newDateNormalized,
      );
    } else {
      setModified(
        lecture[LectureFields[updatedField]] !== newValue,
      );
    }
  }

  function inputChangeHandler(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const fieldName = e.target.name as LectureFields;
    setLecturesInputs((old) => ({ ...old, [fieldName]: e.target.value }));
    checkInputModifies(LectureFields[fieldName], e.target.value);
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
        data-testid='test-select-talker'
        value={lectureInputs.talkerName}
        onChange={inputChangeHandler}
        id="talkerName"
      >
        {talkers.map((talker) => (
          <option
            key={talker.id}
            value={talker.name}
          >
              {talker.name}
            </option>
        ))}
      </select>

      <input
        className='w-32 text-center rounded z-10'
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
            isConfirmDisabled={!isModified}
          />
      </LectureBtns>
    </>
  );
}
