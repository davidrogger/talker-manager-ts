import plusImg from '@/images/plus.svg';
import Image from 'next/image';
import LectureCardContainer from './LectureCardContainer';

export default function LectureCardPlus() {
  return (
    <LectureCardContainer>

      <button className='h-full w-full opacity-70 hover:opacity-90 p-2 active:translate-y-0.5' data-testid='test-add-lecture-button'>
        <Image
          src={plusImg}
          alt='add-lecture-plus-image'
          className='h-full w-full'
          />
      </button>
    </LectureCardContainer>
  );
}
