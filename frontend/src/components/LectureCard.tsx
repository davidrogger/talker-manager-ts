'use client';

import { ILecture } from '@/types';
import { useState } from 'react';
import LectureCardStatic from './LectureCardStatic';
import LectureCardEditable from './LectureCardEditable';
import LectureCardContainer from './LectureCardContainer';

type LectureCardProps = {
  lecture: ILecture;
};

export default function LectureCard({
  lecture,
}:LectureCardProps) {
  const [isEditable, setEditable] = useState<boolean>(false);

  const sharedProps = { lecture, setEditable };
  return (
    <LectureCardContainer>

      {isEditable
        ? <LectureCardEditable {...sharedProps} />
        : <LectureCardStatic {...sharedProps} />
      }

    </LectureCardContainer>
  );
}
