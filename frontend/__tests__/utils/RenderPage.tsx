import { AuthProvider } from '@/contexts/Auth';
import Header from '@/components/Header';

import RenderMockContextProviderNavigation from './RenderMockNavigationProvider';
import pages from './pages';

export default function RenderPage({ route = '/' } = {}) {
  const Page = pages[route];

  return RenderMockContextProviderNavigation(
    <AuthProvider>
      <Header />
      { Page }
    </AuthProvider>,
  );
}
