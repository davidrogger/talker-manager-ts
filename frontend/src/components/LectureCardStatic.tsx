import { ILecture } from '@/types';
import UpdateBtns from '@/components/UpdateBtns';
import { Dispatch, SetStateAction } from 'react';
import LectureBtns from './LectureBtns';

type LectureCardStaticProps = {
  lecture: ILecture;
  setEditable: Dispatch<SetStateAction<boolean>>
}

export default function LectureCardStatic(
  { lecture, setEditable }:LectureCardStaticProps,
) {
  async function editHandle() {
    setEditable(true);
  }

  async function deleteHandle() {
    //
  }

  return (
    <>
      <h1 className="text-lg text-red-800 whitespace-nowrap overflow-hidden">{lecture.title}</h1>
      <p>{lecture.talkerName}</p>
      <p className="opacity-50">{lecture.watchedAt}</p>

      <LectureBtns>
        <UpdateBtns
          editHandle={editHandle}
          deleteHandle={deleteHandle}
        />
      </LectureBtns>
    </>
  );
}
