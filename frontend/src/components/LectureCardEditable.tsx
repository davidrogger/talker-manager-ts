'use client';

import EditableModeBtns from '@/components/EditableModeBtns';
import {
  ILecture, ITalker, LectureFields,
} from '@/types';
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

  function inputChangeHandler(e:ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name as LectureFields;
    setLecturesInputs((old) => ({ ...old, [fieldName]: e.target.value }));
    checkInputModifies(LectureFields[fieldName], e.target.value);
  }

  function talkerChangeHandler(e:ChangeEvent<HTMLSelectElement>) {
    const talkerIndex = Number(e.target.value);
    const talker = talkers[talkerIndex];

    setLecturesInputs((prev) => ({ ...prev, talker }));
    setModified(lecture.talker.id !== talker.id);
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
        data-testid='test-title-input'
        name='title'
        value={lectureInputs.title}
        onChange={inputChangeHandler}
      />

      <select
        className='w-full text-center rounded'
        name="talker"
        data-testid='test-select-talker'
        value={lectureInputs.talker.id}
        onChange={talkerChangeHandler}
        id="talkerName"
      >
        {talkers.map((talker, index) => (
          <option
            key={talker.id}
            value={index}
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
