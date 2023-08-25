'use client';

import { ILecture, ILectureUpdate } from '@/types';

import { updateLectureById } from '@/services/api';

import LectureCardStatic from '@/components/LectureSection/LectureCardStatic';
import LectureCardEditable from '@/components/LectureSection/LectureCardEditable';
import LectureCardContainer from '@/components/LectureSection/LectureCardContainer';
import { useLectureForms } from '@/hooks/useIsLectureFormsVisible';

type LectureCardProps = {
  lecture: ILecture;
};

export default function LectureCard({
  lecture,
}:LectureCardProps) {
  const { isVisible, setVisible } = useLectureForms();

  const sharedProps = { lecture, setVisible, apiHandler: updateLectureById };
  return (
    <LectureCardContainer>

      {isVisible
        ? <LectureCardEditable<ILectureUpdate> {...sharedProps} />
        : <LectureCardStatic {...sharedProps} />
      }

    </LectureCardContainer>
  );
}
