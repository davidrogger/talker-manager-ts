import { useAuthContext } from '@/contexts/Auth';

import { ReactNode } from 'react';

type LecturesBtnsProps = {
  children: ReactNode;
}

export default function LectureBtns({ children }:LecturesBtnsProps) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return (
  <div className='flex justify-between absolute bottom-0 left-0 w-full p-2'>
    { children }
  </div>
    );
  }
}
