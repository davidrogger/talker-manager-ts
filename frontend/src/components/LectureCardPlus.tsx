import plusImg from '@/images/plus.svg';
import Image from 'next/image';

export default function LectureCardPlus() {
  return (
    <div
      className="flex flex-col justify-center items-center m-4 border rounded w-52 h-32 p-4 text-center shadow-lg hover:shadow-xl"
    >
      <button className='h-full w-full opacity-70 hover:opacity-90 p-2 active:translate-y-0.5' data-testid='test-add-lecture-button'>
        <Image
          src={plusImg}
          alt='add-lecture-plus-image'
          className='h-full w-full'
        />
      </button>
    </div>
  );
}
