import TalkersSection from '@/components/TalkersSection';
import { render, screen } from '@testing-library/react';
import { api } from '@/services/api';
import { mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing Component <TalkersSection />', () => {
  it('Should have a table with all talkers registered with an id, name and age', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(mockGetTalkersResponse);

    const resolvedJSX = await TalkersSection();
    render(resolvedJSX);
    const talkers = await screen.findAllByRole('row');
    screen.debug();
    expect(talkers).toHaveLength(3);
  });
});
