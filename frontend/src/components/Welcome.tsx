'use client';

import { useAuthContext } from '@/contexts/Auth';

export default function Welcome() {
  const { user } = useAuthContext();

  if (user) {
    const { firstName, lastName } = user;
    return (
      <div data-testid='welcome-name-id' className='p-8 text-lg'>
        Olá, {firstName} {lastName}!
      </div>
    );
  }
}
