'use client';

import { useAuthContext } from '@/contexts/Auth';
import AnimatedLink from '@/components/AnimatedLink';

export default function Nav() {
  const { isAuthenticated, signOut } = useAuthContext();

  function logoutHandler() {
    signOut();
  }

  return (
    isAuthenticated
      ? (<div className='w-56 flex justify-between'>
      <AnimatedLink
          href='/'
          testId='header-home-nav-id'
          title='Home'
          underlineColor='white'
        />
      <AnimatedLink
          href='/dashboard'
          testId='header-dashboard-nav-id'
          title='Dashboard'
          underlineColor='white'
        />
      <button
          data-testid='header-logout-nav-id'
          className='opacity-50 hover:opacity-100'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </ div>)
      : (<AnimatedLink
        href='/login'
        testId='header-login-nav-id'
        title='Login'
        underlineColor='white'
      />)
  );
}
