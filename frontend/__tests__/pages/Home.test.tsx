import { api } from '@/services/api';
import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

import { AuthContext, IAuthContext } from '@/contexts/Auth';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';

import { mockLectures } from '../utils/_mockData';

describe('Testing Home Page', () => {
  beforeEach(jest.restoreAllMocks);

  it('Should render all elements from the Home page', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { lectures: mockLectures } });

    RenderWithAuthProvider(<Home />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(await screen.findAllByText('Davíd Roggér')).toHaveLength(8);
  });

  it('Should render a refresh button if something went wrong with the api request', async () => {
    jest.spyOn(api, 'get').mockRejectedValue({ error: 'fake-error' });

    RenderWithAuthProvider(<Home />);

    const refreshBtn = await screen.findByRole('button', { name: 'Refresh' });
    expect(refreshBtn).toBeInTheDocument();
    expect(refreshBtn).toBeVisible();
  });

  it('Should not have a card with a button to add new lecture when is not authenticated', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { lectures: mockLectures } });
    RenderWithAuthProvider(<Home />);
    await screen.findAllByText('Davíd Roggér');

    expect(screen.queryByTestId<HTMLButtonElement>('test-add-lecture-button')).not.toBeInTheDocument();
  });

  it('Should have a card with a button to add a new lecture when is authenticated', async () => {
    render(
      <AuthContext.Provider value={ { isAuthenticated: true } as IAuthContext }>
        <Home />
      </AuthContext.Provider>,
    );

    expect(await screen.findByTestId<HTMLButtonElement>('test-add-lecture-button')).toBeInTheDocument();
  });
});

// https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
