import { screen } from '@testing-library/react';

import { api } from '@/services/api';

import Login from '@/app/login/page';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';

describe('Testing page Login', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Should render all elements from page Login', () => {
    RenderWithAuthProvider(<Login />);

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
    const { user } = RenderWithAuthProvider(<Login />);

    const btnEnter = screen.getByRole('button', { name: 'Enter' });
    await user.click(btnEnter);

    const warningMsg = await screen.findByText(/please you need to fill the email and password/i);
    expect(warningMsg).toBeInTheDocument();
  });

  it('Should request authentication to the API and go to the dashboard', async () => {
    const mockApi = jest.spyOn(api, 'post')
      .mockResolvedValue({ data: { token: 'valid-token' } });

    const mockLocalStorage = jest.spyOn(localStorage, 'setItem');

    const { user, mockRouter } = RenderWithAuthProvider(<Login />);

    const userInput = { email: 'teste@teste.com', password: '123456' };

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnEnter = screen.getByRole('button', { name: 'Enter' });

    await user.type(inputEmail, userInput.email);
    await user.type(inputPassword, userInput.password);
    await user.click(btnEnter);

    expect(mockApi).toHaveBeenCalledWith('/login', userInput);
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    expect(mockLocalStorage).toHaveBeenCalled();
  });

  it('Should show the axios response error when reject by the api', async () => {
    const expectedMsg = 'Unauthorized Access';

    jest.spyOn(api, 'post')
      .mockRejectedValue({ response: { data: { message: expectedMsg } } });

    const { user, mockRouter } = RenderWithAuthProvider(<Login />);

    const userInput = { email: 'unauthorized@email.com', password: '123456' };

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnEnter = screen.getByRole('button', { name: 'Enter' });

    await user.type(inputEmail, userInput.email);
    await user.type(inputPassword, userInput.password);
    await user.click(btnEnter);

    const warningMsg = await screen.findByText(expectedMsg);

    expect(warningMsg).toBeInTheDocument();
    expect(mockRouter.push).not.toHaveBeenCalledWith('/dashboard');
  });
});
