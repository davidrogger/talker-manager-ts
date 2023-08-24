'use client';

import {
  ApiStatus,
  ILecture, ITalker, LectureFields,
} from '@/types';

import { normalizeDateToApi, normizeDateToDatePicker } from '@/utils/dateHandler';

import {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState,
} from 'react';

import { getAllTalkers } from '@/services/api';

import { useLectureContext } from '@/contexts/Lectures';

import SpinLoading from '@/components/SpinLoading';
import LectureBtns from '@/components/LectureSection/LectureBtns';
import EditableModeBtns from '@/components/EditableModeBtns';

type LectureCardEditableProps<T> = {
  setEditable: Dispatch<SetStateAction<boolean>>;
  lecture: ILecture;
  apiHandler: (params:T) => Promise<void>,
}

export default function LectureCardEditable<T>(
  { setEditable, lecture, apiHandler }:LectureCardEditableProps<T>,
) {
  const { setLectureApiStatus } = useLectureContext();
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

      if (response.talkers && !talkers.length) {
        setTalkers(response.talkers);
      }

      if (!lectureInputs.talker.id && response.talkers) {
        const [talker] = response.talkers;
        setLecturesInputs((prev) => ({ ...prev, talker }));
      }
    }
    loadTalkersName();
  }, [talkers, lectureInputs]);

  const isTalkerLoading = !talkers.length;

  function checkInputModifies(updatedField:LectureFields, newValue:string) {
    if (updatedField === LectureFields.watchedAt && newValue) {
      const newDateNormalized = normalizeDateToApi(newValue);
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
    const talkerIndex = talkers.findIndex(({ id }) => id === e.target.value);
    const talker = talkers[talkerIndex];

    setLecturesInputs((prev) => ({ ...prev, talker }));
    setModified(lecture.talker.id !== talker.id);
  }

  async function cancelHandle() {
    setEditable(false);
  }

  async function confirmHandle() {
    const {
      id, title, watchedAt, talker: { id: talkerId },
    } = lectureInputs;

    const lectureBody = {
      title,
      watchedAt: normalizeDateToApi(watchedAt),
      talkerId,
    };
    const payload = { id, ...lectureBody } as T;

    await apiHandler(payload);
    setLectureApiStatus(ApiStatus.PENDING);
    setEditable(false);
  }

  return (
    <>
      <input
        className='w-full text-center text-lg text-red-800 rounded'
        type="text"
        data-testid='test-title-input'
        name='title'
        autoFocus
        value={lectureInputs.title}
        onChange={inputChangeHandler}
      />

      { isTalkerLoading
        ? (
          <div className='relative animate-pulse bg-white h-5 rounded opacity-70 w-full'>
            <SpinLoading />
          </div>
        )
        : (
          <select
            className='w-full text-center rounded'
            name="talker"
            data-testid='test-select-talker'
            value={lectureInputs.talker.id}
            onChange={talkerChangeHandler}
            id="talkerName"
          >
            {talkers.map((talker) => (
              <option
                key={talker.id}
                value={talker.id}
              >
                  {talker.name}
                </option>
            ))}
          </select>
        )
      }

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
