import React from 'react';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default function RenderMockContextProviderNavigation(
  children:React.JSX.Element,
  router:Partial<AppRouterInstance> = {},
) {
  const mockRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };
  return {
    user: userEvent.setup(),
    mockRouter,
    ...render(<AppRouterContext.Provider value={mockRouter}>
        { children }
    </AppRouterContext.Provider>),
  };
}

// https://github.com/vercel/next.js/discussions/48937
