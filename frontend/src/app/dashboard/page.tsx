'use client';

import MainTitle from '@/components/MainTitle';
import TalkersSection from '@/components/TalkersSection';
import Welcome from '@/components/Welcome';
import { useAuthContext } from '@/contexts/Auth';
import { useEffect } from 'react';

function Dashboard() {
  const { isAuthenticated, authStoredToken } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      authStoredToken();
    }
  }, [isAuthenticated, authStoredToken]);

  if (isAuthenticated) {
    return (
    <div className='flex flex-col items-center'>
      <MainTitle title='Dashboard' />

      <Welcome />

      <TalkersSection />

    </div>
    );
  }
}

export default Dashboard;
