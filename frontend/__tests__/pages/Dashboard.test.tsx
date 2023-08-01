import { screen } from '@testing-library/react';
import RenderPage from '../utils/RenderPage';

describe.only('Testing page Dashboard', () => {
  it('Should render the header component', () => {
    RenderPage({ route: '/dashboard' });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('header-container-id')).toBeInTheDocument();
  });

  it('Should have the logged elements in the header', () => {
    RenderPage({ route: '/dashboard' });

    const logout = screen.getByTestId('header-logout-nav-id');
    const dashboard = screen.getByTestId('header-dashboard-nav-id');
    const home = screen.getByTestId('header-home-nav-id');

    expect(logout).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
    expect(home).toBeInTheDocument();
  });
});
