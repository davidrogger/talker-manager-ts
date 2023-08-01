'use client';

import { useAuthContext } from '@/contexts/Auth';

export default function Welcome() {
  const { user } = useAuthContext();

  if (user) {
    const { firstName, lastName } = user;
    return (
      <div data-testid='welcome-name-id'>
        Olá, {firstName} {lastName}!
      </div>
    );
  }

  return null;
}
