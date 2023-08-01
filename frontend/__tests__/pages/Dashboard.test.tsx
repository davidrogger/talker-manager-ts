import Dashboard from '@/app/dashboard/page';
import { api } from '@/services/api';
import { screen } from '@testing-library/react';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';

describe('Testing page Dashboard', () => {
  it('Should render dashboard elements', async () => {
    RenderWithAuthProvider(<Dashboard />);

    const title = await screen.findByRole('heading', { name: 'Dashboard' });

    expect(title).toBeInTheDocument();
  });

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
});
