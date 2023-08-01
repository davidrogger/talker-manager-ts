import Dashboard from '@/app/dashboard/page';
import { AuthProvider } from '@/contexts/Auth';
import { api } from '@/services/api';
import { render, screen } from '@testing-library/react';

describe('Testing page Dashboard', () => {
  it('Should render dashboard elements', () => {
    render(<Dashboard />);

    const title = screen.getByRole('heading', { name: 'Dashboard' });

    expect(title).toBeInTheDocument();
  });

  it('Should render the name of the manager logged in the dashboard painel', async () => {
    const mockUser = {
      firstName: 'Jonas',
      lastName: 'Doe',
      email: 'jonasdoe@testes.com',
    };

    const mockLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'get').mockReturnValue('');
    const mockAPI = jest.spyOn(api, 'getUserData').mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>,
    );

    expect(mockLocalStorage).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalled();
    expect(await screen.findByText('Jonas Doe')).toBeInTheDocument();
  });
});
