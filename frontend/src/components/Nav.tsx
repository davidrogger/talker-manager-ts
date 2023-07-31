'use client';

import { useAuthContext } from '@/contexts/Auth';
import AnimatedLink from './AnimatedLink';

export default function Nav() {
  const { isAuthenticated, signOut } = useAuthContext();

  async function logoutHandler() {
    await signOut();
  }

  return (
    isAuthenticated
      ? (<div>
      <AnimatedLink
          href='/dashboard'
          testId='header-dashboard-id'
          title='Dashboard'
          underlineColor='white'
        />
      <button
          data-testid='header-logout-id'
          className='opacity-50 hover:opacity-100 ml-4'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </ div>)
      : (<AnimatedLink
        href='/login'
        testId='header-login-id'
        title='Login'
        underlineColor='white'
      />)
  );
}
