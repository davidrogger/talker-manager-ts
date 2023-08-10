import TalkersSection from '@/components/TalkersSection';
import { render, screen } from '@testing-library/react';
import { api } from '@/services/api';
import { mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing Component <TalkersSection />', () => {
  it('Should have a table with all talkers registered with an id, name and age', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });

    render(<TalkersSection />);

    expect(await screen.findByText('Jonas Doe')).toBeVisible();
    expect(await screen.findByText('Davíd Roggér')).toBeVisible();
    expect(await screen.findByText('Gale')).toBeVisible();
  });
});
