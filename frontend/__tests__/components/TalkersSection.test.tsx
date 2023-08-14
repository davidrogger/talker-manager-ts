import TalkersSection from '@/components/TalkersSection';
import { render, screen } from '@testing-library/react';
import { api } from '@/services/api';
import userEvent from '@testing-library/user-event';

import { fakeTalkerUpdate, mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing Component <TalkersSection />', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
  });

  it('Should have a table with all talkers registered with an id, name and age', async () => {
    render(<TalkersSection />);

    expect(await screen.findByText('Jonas Doe')).toBeVisible();
    expect(await screen.findByText('Davíd Roggér')).toBeVisible();
    expect(await screen.findByText('Gale')).toBeVisible();
  });

  it('Should have a edit button for each table row', async () => {
    render(<TalkersSection />);
    const allEditBtns = await screen.findAllByAltText('image-edit-button');
    expect(allEditBtns).toHaveLength(3);
  });

  it('Should reveal a confirm and cancel button, after clicking in the edit button', async () => {
    render(<TalkersSection />);

    const [editBtn] = await screen.findAllByAltText('image-edit-button');
    await userEvent.click(editBtn);
    const confirmBtn = await screen.findByAltText('image-confirm-button');
    const cancelBtn = await screen.findByAltText('image-cancel-button');

    expect(confirmBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
  });

  it('Should be able to access an input to update the name', async () => {
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByAltText('image-edit-button');
    await userEvent.click(jonasEditBtn);

    const talkerInputUpdate = await screen.findByDisplayValue('Jonas Doe');
    expect(talkerInputUpdate).toBeVisible();
    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    expect(await screen.findByDisplayValue(textInputUpdate)).toBeVisible();
  });

  it('Should revert the changes if clicked in the cancel button', async () => {
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByAltText('image-edit-button');
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const cancelBtn = await screen.findByAltText('image-cancel-button');

    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    await userEvent.click(cancelBtn);
    expect(talkerInputUpdate).not.toBeInTheDocument();
    expect(await screen.findByText(currentTalkerName)).toBeVisible();
  });

  it('Should send a request for update when clicking in the confirm button', async () => {
    const mockAPI = jest
      .spyOn(api, 'put')
      .mockImplementation(
        (endpoint:string, payload) => fakeTalkerUpdate(endpoint, payload),
      );

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');

    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByAltText('image-edit-button');
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const confirmBtn = await screen.findByAltText('image-confirm-button');

    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    const [jonasData] = mockGetTalkersResponse;

    await userEvent.click(confirmBtn);
    expect(mockAPI).toHaveBeenCalled();
    expect(mockAPI)
      .toHaveBeenCalledWith(`/talker/${jonasData.id}`, { name: textInputUpdate }, { headers: { Authorization: 'valid-token' } });

    expect(await screen.findByText(textInputUpdate)).toBeVisible();
  });
});