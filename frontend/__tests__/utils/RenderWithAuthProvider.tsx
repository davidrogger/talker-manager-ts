import { AuthProvider } from '@/contexts/Auth';

import React from 'react';
import RenderMockContextProviderNavigation from './RenderMockNavigationProvider';

export default function RenderWithAuthProvider(children:React.JSX.Element) {
  return RenderMockContextProviderNavigation(
    <AuthProvider>
      { children }
    </AuthProvider>,
  );
}
