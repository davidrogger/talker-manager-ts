import { useState } from 'react';

import Image from 'next/image';
import plusImg from '@/images/plus.svg';

import { ICreateNewLecture, ILecture } from '@/types';

import { createLecture } from '@/services/api';

import LectureCardEditable from '@/components/LectureSection/LectureCardEditable';
import LectureCardContainer from '@/components/LectureSection/LectureCardContainer';

const newLectureDefault: ILecture = {
  id: '',
  talker: {
    id: '',
    name: 'First Talker',
  },
  title: '',
  watchedAt: '24/08/2023',
};

export default function LectureCardPlus() {
  const [isEditable, setEditable] = useState<boolean>(false);
  const sharedProps = { lecture: newLectureDefault, setEditable, apiHandler: createLecture };
  return (
    <LectureCardContainer>
      {isEditable
        ? <LectureCardEditable<ICreateNewLecture> {...sharedProps} />
        : (
          <button
            className='h-full w-full opacity-70 hover:opacity-90 p-2 active:translate-y-0.5' data-testid='test-add-lecture-button'
            onClick={() => setEditable(true)}
          >
            <Image
              src={plusImg}
              alt='add-lecture-plus-image'
              className='h-full w-full'
              />
          </button>
        )
      }
    </LectureCardContainer>
  );
}
