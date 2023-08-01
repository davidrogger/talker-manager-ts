'use client';

import Welcome from '@/components/Welcome';
import { useAuthContext } from '@/contexts/Auth';
import { useEffect } from 'react';

function Dashboard() {
  const { isAuthenticated, authStoredToken } = useAuthContext();

  useEffect(() => {
    authStoredToken();
  }, []);

  if (isAuthenticated) {
    return (
    <div>
      <h1>Dashboard</h1>

      <Welcome />

    </div>
    );
  }
}

export default Dashboard;
