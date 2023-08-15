'use client';

import MainTitle from '@/components/MainTitle';
import TalkersSection from '@/components/TalkersSection';
import Welcome from '@/components/Welcome';
import { useAuthContext } from '@/contexts/Auth';
import DashboardProvider from '@/contexts/Dashboard';
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
      <DashboardProvider>
        <div className='flex flex-col items-center'>
          <MainTitle title='Dashboard' />

          <Welcome />

          <TalkersSection />

        </div>
      </DashboardProvider>
    );
  }
}

export default Dashboard;
