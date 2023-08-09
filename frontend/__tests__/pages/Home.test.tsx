import Home from '@/app/page';
import { api } from '@/services/api';
import { render, screen } from '@testing-library/react';
import { mockLectures } from '../utils/_mockData';

describe('Testing Home Page', () => {
  it('Should render all elements from the Home page', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { lectures: mockLectures } });
    const jsx = await Home();
    render(jsx);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getAllByText('Davíd Roggér')).toHaveLength(8);
  });
});

// https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
