'use client';

import { ILecture } from '@/types';
import { useState } from 'react';
import LectureCardStatic from './LectureCardStatic';
import LectureCardEditable from './LectureCardEditable';

type LectureCardProps = {
  lecture: ILecture;
};

export default function LectureCard({
  lecture,
}:LectureCardProps) {
  const [isEditable, setEditable] = useState<boolean>(false);

  const sharedProps = { lecture, setEditable };
  return (
    <div
      className="relative flex flex-col justify-between items-center m-4 border rounded w-52 h-32 p-4 text-center shadow-lg hover:shadow-xl"
    >
      {isEditable
        ? <LectureCardEditable {...sharedProps} />
        : <LectureCardStatic {...sharedProps} />
      }

    </div>
  );
}
