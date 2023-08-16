'use client';

import LectureCard from '@/components/LectureCard';
import { getAllLectures } from '@/services/api';
import MainTitle from '@/components/MainTitle';
import RefreshBtn from '@/components/RefreshBtn';
import { useEffect, useState } from 'react';
import { ILecture } from '@/types';
import { useAuthContext } from '@/contexts/Auth';

export default function Home() {
  const { isAuthenticated, authStoredToken } = useAuthContext();
  const [displayedLectures, setDisplayedLectures] = useState<ILecture[]>([]);

  useEffect(() => {
    async function loadLectures() {
      const { lectures } = await getAllLectures();

      if (lectures) setDisplayedLectures(lectures);
    }

    if (!isAuthenticated) authStoredToken();
    if (!displayedLectures.length) loadLectures();
  }, [displayedLectures, authStoredToken, isAuthenticated]);

  return (
    <div>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>
        {displayedLectures
          ? (displayedLectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            {...lecture}
          />
          )))
          : (<RefreshBtn message='Something went wrong!' />)}
      </div>
    </div>
  );
}
