import Login from '@/app/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testing page Login', () => {
  it('Should render all elements from page Login', () => {
    render(<Login />);
    const title = screen.getByRole('heading', { name: 'Manager Login' });
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    const btnHome = screen.getByRole('link', { name: 'Back Home' });

    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
    expect(btnHome).toBeInTheDocument();
    expect(btnHome).toHaveAttribute('href', '/');
  });

  it('Should render a error message when trying to login without input any value', async () => {
    render(<Login />);

    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    await userEvent.click(btnEnter);

    const warningMsg = await screen.findByText(/please you need to fill the email and password/i);
    expect(warningMsg).toBeInTheDocument();
  });
});
