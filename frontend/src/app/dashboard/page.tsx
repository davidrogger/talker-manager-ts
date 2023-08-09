'use client';

import MainTitle from '@/components/MainTitle';
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
    <div>
      <MainTitle title='Dashboard' />

      <Welcome />

    </div>
    );
  }
}

export default Dashboard;
