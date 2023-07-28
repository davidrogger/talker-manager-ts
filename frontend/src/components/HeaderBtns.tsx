'use client';

import { useAuthContext } from '@/contexts/Auth';
import AnimatedLink from './AnimatedLink';

export default function HeaderBtns() {
  const { isAuthenticated } = useAuthContext();

  function logoutHandler() {
    console.log('logout');
  }

  return (
    isAuthenticated
      ? (<>
      <AnimatedLink
          href='/dashboard'
          testId='header-dashboard-id'
          title='Dashboard'
          underlineColor='white'
        />
      <AnimatedLink
          href='/'
          testId='header-logout-id'
          title='Logout'
          underlineColor='white'
        />
      </>)
      : (<AnimatedLink
        href='/login'
        testId='header-login-id'
        title='Login'
        underlineColor='white'
      />)
  );
}
