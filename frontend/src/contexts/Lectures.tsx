import {
  Dispatch,
  ReactNode, SetStateAction, createContext, useContext, useEffect, useState,
} from 'react';

import { getAllLectures } from '@/services/api';

import { ApiStatus, ILecture } from '@/types';

import { useAuthContext } from '@/contexts/Auth';

type ILectureContext = {
  displayedLectures: ILecture[],
  lectureApiStatus: ApiStatus,
  setDisplayedLectures: Dispatch<SetStateAction<ILecture[]>>,
  setLectureApiStatus: Dispatch<SetStateAction<ApiStatus>>,
}

const LectureContext = createContext({} as ILectureContext);

export function LectureProvider({ children }: { children: ReactNode }) {
  const [displayedLectures, setDisplayedLectures] = useState<ILecture[]>([]);
  const [lectureApiStatus, setLectureApiStatus] = useState<ApiStatus>(ApiStatus.PENDING);

  const { isAuthenticated, authStoredToken } = useAuthContext();

  useEffect(() => {
    async function loadLectures() {
      const { lectures, error } = await getAllLectures();
      console.log('reload lecture context');

      if (lectures) {
        setDisplayedLectures(lectures);
        setLectureApiStatus(ApiStatus.RESOLVED);
      }
      if (error) {
        setLectureApiStatus(ApiStatus.REJECTED);
      }
    }

    if (!isAuthenticated) authStoredToken();
    if (lectureApiStatus === ApiStatus.PENDING) loadLectures();
    //
  }, [displayedLectures, authStoredToken, isAuthenticated, lectureApiStatus]);

  const sharedContext = {
    displayedLectures,
    lectureApiStatus,
    setDisplayedLectures,
    setLectureApiStatus,
  };

  return (
    <LectureContext.Provider value={sharedContext}>
      { children }
    </LectureContext.Provider>
  );
}

export const useLectureContext = () => useContext(LectureContext);
