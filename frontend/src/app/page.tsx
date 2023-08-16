'use client';

import { getAllLectures } from '@/services/api';
import MainTitle from '@/components/MainTitle';
import { useEffect, useState } from 'react';
import { ApiStatus, ILecture } from '@/types';
import { useAuthContext } from '@/contexts/Auth';
import RenderContentByApiStatus from '@/components/RenderContentByApiStatus';

export default function Home() {
  const { isAuthenticated, authStoredToken } = useAuthContext();
  const [displayedLectures, setDisplayedLectures] = useState<ILecture[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.PENDING);

  useEffect(() => {
    async function loadLectures() {
      const { lectures, error } = await getAllLectures();

      if (lectures) {
        setDisplayedLectures(lectures);
        setApiStatus(ApiStatus.RESOLVED);
      }
      if (error) {
        setApiStatus(ApiStatus.REJECTED);
      }
    }

    if (!isAuthenticated) authStoredToken();
    if (!displayedLectures.length) loadLectures();
    //
  }, [displayedLectures, authStoredToken, isAuthenticated]);

  return (
    <div>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>

        <RenderContentByApiStatus status={apiStatus} lectures={displayedLectures} />

      </div>
    </div>
  );
}
