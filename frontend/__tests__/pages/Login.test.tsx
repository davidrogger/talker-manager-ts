import { render, screen } from '@testing-library/react';

import Login from '@/app/login/page';

import { api } from '@/services/api';

import { AuthProvider } from '@/contexts/Auth';
import RenderMockContextProviderNavigation from '../utils/RenderMockNavigationProvider';

describe('Testing page Login', () => {
  afterAll(() => jest.restoreAllMocks());

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
    const { user } = RenderMockContextProviderNavigation(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    await user.click(btnEnter);

    const warningMsg = await screen.findByText(/please you need to fill the email and password/i);
    expect(warningMsg).toBeInTheDocument();
  });

  it('Should request authentication to the API and go to the dashboard', async () => {
    const mockApi = jest.spyOn(api, 'post')
      .mockResolvedValue({ data: { token: 'valid-token' } });

    const { user, mockRouter } = RenderMockContextProviderNavigation(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const userInput = { email: 'teste@teste.com', password: '123456' };

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnEnter = screen.getByRole('button', { name: 'Enter' });

    await user.type(inputEmail, userInput.email);
    await user.type(inputPassword, userInput.password);
    await user.click(btnEnter);

    expect(mockApi).toHaveBeenCalledWith('/login', userInput);
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
  });
});
