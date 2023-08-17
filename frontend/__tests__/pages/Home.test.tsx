import Home from '@/app/page';
import { api } from '@/services/api';
import { screen } from '@testing-library/react';
import { mockLectures } from '../utils/_mockData';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';

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
});

// https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
