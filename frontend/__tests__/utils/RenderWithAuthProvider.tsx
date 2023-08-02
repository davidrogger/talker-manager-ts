import { AuthProvider } from '@/contexts/Auth';

import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import RenderMockContextProviderNavigation from './RenderMockContextProviderNavigation';

export default function RenderWithAuthProvider(
  children:React.JSX.Element,
  router:Partial<AppRouterInstance> = {},
) {
  return RenderMockContextProviderNavigation(
    <AuthProvider>
      { children }
    </AuthProvider>,
    router,
  );
}
