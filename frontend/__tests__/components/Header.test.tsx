import Header from '@/components/Header';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import { render, screen } from '@testing-library/react';

describe('Testing Component <Header />', () => {
  it('Should render header elements', () => {
    render(<Header />);
    const title = screen.getByText('Talker Manager');
    const login = screen.getByTestId('header-login-id');
    expect(title).toBeInTheDocument();
    expect(login).toHaveTextContent('Login');
    expect(login).toHaveAttribute('href', '/login');
  });

  it('Should render "logout" and "dashboard" options when is Authenticated', async () => {
    const mockAuthContext = { isAuthenticated: true } as IAuthContext;
    render(
      <AuthContext.Provider value={ mockAuthContext }>
        <Header />
      </AuthContext.Provider>,
    );

    const logout = screen.getByText('Logout');
    const dashboard = screen.getByText('dashboard');

    expect(logout).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
  });
});
