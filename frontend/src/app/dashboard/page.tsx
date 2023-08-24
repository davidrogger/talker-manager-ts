'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MainTitle from '@/components/MainTitle';
import TalkersSection from '@/components/TalkerSection/TalkersSection';
import Welcome from '@/components/Welcome';

import { useAuthContext } from '@/contexts/Auth';
import DashboardProvider from '@/contexts/Dashboard';

function Dashboard() {
  const { isAuthenticated, authStoredToken } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    async function loadAuthentication() {
      const response = await authStoredToken();
      if (response?.error) router.push('/login');
    }

    if (!isAuthenticated) {
      loadAuthentication();
    }
  }, [isAuthenticated, router, authStoredToken]);

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
