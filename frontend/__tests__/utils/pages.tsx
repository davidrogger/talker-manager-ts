import Dashboard from '@/app/dashboard/page';
import Login from '@/app/login/page';

const pages: Record<string, JSX.Element> = {
  '/login': <Login />,
  '/dashboard': <Dashboard />,
};

export default pages;
