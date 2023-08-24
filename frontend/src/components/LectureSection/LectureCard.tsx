'use client';

import { useState } from 'react';

import { ILecture, ILectureUpdate } from '@/types';

import { updateLectureById } from '@/services/api';

import LectureCardStatic from '@/components/LectureSection/LectureCardStatic';
import LectureCardEditable from '@/components/LectureSection/LectureCardEditable';
import LectureCardContainer from '@/components/LectureSection/LectureCardContainer';

type LectureCardProps = {
  lecture: ILecture;
};

export default function LectureCard({
  lecture,
}:LectureCardProps) {
  const [isEditable, setEditable] = useState<boolean>(false);

  const sharedProps = { lecture, setEditable, apiHandler: updateLectureById };
  return (
    <LectureCardContainer>

      {isEditable
        ? <LectureCardEditable<ILectureUpdate> {...sharedProps} />
        : <LectureCardStatic {...sharedProps} />
      }

    </LectureCardContainer>
  );
}
