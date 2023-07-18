import Header from '@/components/Header';
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
});
