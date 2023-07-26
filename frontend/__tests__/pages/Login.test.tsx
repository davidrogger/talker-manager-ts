import Login from '@/app/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { AuthProvider } from '@/contexts/Auth';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import createMockRouter from '../utils/createMockRouter';

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
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AuthProvider>
          <Login />
        </AuthProvider>,
      </RouterContext.Provider>,
    );

    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    await userEvent.click(btnEnter);

    const warningMsg = await screen.findByText(/please you need to fill the email and password/i);
    expect(warningMsg).toBeInTheDocument();
  });

  it('Should request authentication to the API and go to the dashboard', async () => {
    const mockFetch = jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AuthProvider>
          <Login />
        </AuthProvider>,
      </RouterContext.Provider>,
    );

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnEnter = screen.getByRole('button', { name: 'Enter' });

    await userEvent.type(inputEmail, 'teste@teste.com');
    await userEvent.type(inputPassword, '123456');
    await userEvent.click(btnEnter);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    const dashboardTitle = await screen.findByRole('heading', { name: 'Dashboard' });
    expect(dashboardTitle).toBeInTheDocument();
  });
});
