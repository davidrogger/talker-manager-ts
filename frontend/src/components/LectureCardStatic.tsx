import { ILecture } from '@/types';
import UpdateBtns from '@/components/UpdateBtns';
import { Dispatch, SetStateAction, useState } from 'react';
import { deleteLectureById } from '@/services/api';
import LectureBtns from './LectureBtns';
import DeleteWarning from './DeleteWarning';

type LectureCardStaticProps = {
  lecture: ILecture;
  setEditable: Dispatch<SetStateAction<boolean>>
}

export default function LectureCardStatic(
  { lecture, setEditable }:LectureCardStaticProps,
) {
  const [isDeleteWarning, setDeleteWarning] = useState<boolean>(false);

  async function editHandle() {
    setEditable(true);
  }

  async function deleteHandle() {
    setDeleteWarning(true);
  }

  return (
    <>
      <h1 className="text-lg text-red-800 whitespace-nowrap overflow-hidden">{lecture.title}</h1>
      <p>{lecture.talker.name}</p>
      <p className="opacity-50">{lecture.watchedAt}</p>

      {isDeleteWarning && (
      <DeleteWarning
        deleteEntityById={deleteLectureById}
        entity={lecture}
        setDeleteWarning={setDeleteWarning}
      />)}

      <LectureBtns>
        <UpdateBtns
          editHandle={editHandle}
          deleteHandle={deleteHandle}
        />
      </LectureBtns>
    </>
  );
}
