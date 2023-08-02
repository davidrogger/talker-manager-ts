import Dashboard from '@/app/dashboard/page';
import { api } from '@/services/api';
import { screen } from '@testing-library/react';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';

describe('Testing page Dashboard', () => {
  beforeEach(() => jest.restoreAllMocks());

  it('Should render the name of the manager logged in the dashboard painel', async () => {
    const mockUser = {
      data: {
        user: {
          firstName: 'Jonas',
          lastName: 'Doe',
          email: 'jonasdoe@testes.com',
        },
      },
    };

    jest.mock('axios');

    const mockLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');
    const mockAPI = jest.spyOn(api, 'get').mockResolvedValue(mockUser);

    RenderWithAuthProvider(<Dashboard />);

    expect(mockLocalStorage).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalled();
    expect(await screen.findByTestId('welcome-name-id')).toHaveTextContent('Olá, Jonas Doe!');
  });

  it('Should redirect to home page when missing a token in the localStorage', async () => {
    const mockLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('');

    const { mockRouter } = RenderWithAuthProvider(<Dashboard />);

    expect(mockLocalStorage).toHaveBeenCalledWith('talker-token');
    await Promise.resolve();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('Should redirect to home page when the token is invalid', async () => {
    const mockResponse = { response: { data: { message: 'Invalid Token' } } };
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('invalid-token');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');
    const mockAPI = jest.spyOn(api, 'get').mockRejectedValue(mockResponse);

    const { mockRouter } = await RenderWithAuthProvider(<Dashboard />);

    await expect(mockAPI).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
