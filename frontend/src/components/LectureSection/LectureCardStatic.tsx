import { Dispatch, SetStateAction, useState } from 'react';

import { ILecture } from '@/types';

import { deleteLectureById } from '@/services/api';

import UpdateBtns from '@/components/UpdateBtns';
import LectureBtns from '@/components/LectureSection/LectureBtns';
import DeleteWarning from '@/components/DeleteWarning';

type LectureCardStaticProps = {
  lecture: ILecture;
  setVisible: Dispatch<SetStateAction<boolean>>
}

export default function LectureCardStatic(
  { lecture, setVisible: setEditable }:LectureCardStaticProps,
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
