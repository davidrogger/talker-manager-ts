'use client';

import MainTitle from '@/components/MainTitle';
import RenderContentByApiStatus from '@/components/RenderContentByApiStatus';
import { LectureProvider } from '@/contexts/Lectures';

export default function Home() {
  return (
    <LectureProvider>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>

        <RenderContentByApiStatus />

      </div>
    </LectureProvider>
  );
}
