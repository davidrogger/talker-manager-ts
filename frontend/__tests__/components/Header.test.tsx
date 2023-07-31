import Header from '@/components/Header';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import { render, screen } from '@testing-library/react';

describe('Testing Component <Header />', () => {
  it('Should render header elements', () => {
    render(<Header />);
    const title = screen.getByText('Talker Manager');
    const login = screen.getByTestId('header-login-nav-id');
    expect(title).toBeInTheDocument();
    expect(login).toHaveTextContent('Login');
    expect(login).toHaveAttribute('href', '/login');
  });

  it('Should render "logout", "dashboard" and "home" options when is Authenticated', async () => {
    const mockAuthContext = { isAuthenticated: true } as IAuthContext;
    render(
      <AuthContext.Provider value={ mockAuthContext }>
        <Header />
      </AuthContext.Provider>,
    );

    const logout = screen.getByTestId('header-logout-nav-id');
    const dashboard = screen.getByTestId('header-dashboard-nav-id');
    const home = screen.getByTestId('header-home-nav-id');

    expect(logout).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
    expect(home).toBeInTheDocument();
  });
});
