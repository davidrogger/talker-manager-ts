import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { AuthProvider } from '@/contexts/Auth';

export function createMockRouter(router:Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  } as NextRouter;
}

export function renderWithProviders(ui: React.JSX.Element, customRouter:Partial<NextRouter> = {}) {
  const mockRouter = createMockRouter(customRouter);
  return {
    user: userEvent.setup(),
    router: mockRouter,
    ...render(
      <RouterContext.Provider value={mockRouter}>
        <AuthProvider>
          { ui }
        </AuthProvider>
      </RouterContext.Provider>,
    ),
  };
}

// https://www.youtube.com/watch?v=uF2lqBluQV8
