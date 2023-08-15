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

  it('Should have an "Add New Talker" in the dashboard', async () => {
    render(<TalkersSection />);
    const addTalkerBtn = await screen.findByText('Add New Talker');

    expect(addTalkerBtn).toBeVisible();
  });

  it('Should popup a window with an input to create a new talker', async () => {
    render(<TalkersSection />);
    const addTalkerBtn = await screen.findByText('Add New Talker');

    await userEvent.click(addTalkerBtn);

    expect(await screen.findByPlaceholderText('Type the name here...')).toBeVisible();
    expect(await screen.findByRole('button', { name: 'Add' })).toBeVisible();
    expect(await screen.findByRole('button', { name: /back to the dashboard/ })).toBeVisible();
  });

  it('Should close the new talker window when clicked in the "back to the dashboard"', async () => {
    render(<TalkersSection />);
    const openNewTalkerWindowBtn = await screen.findByText('Add New Talker');

    await userEvent.click(openNewTalkerWindowBtn);
    const closeWindowBtn = await screen.findByRole('button', { name: /back to the dashboard/ });
    const addTalkerBtn = await screen.findByRole('button', { name: 'Add' });
    await userEvent.click(closeWindowBtn);

    expect(closeWindowBtn).not.toBeVisible();
    expect(addTalkerBtn).not.toBeVisible();
  });

  it('Should have a table with all talkers registered with an id and name', async () => {
    render(<TalkersSection />);

    expect(await screen.findByText('Jonas Doe')).toBeVisible();
    expect(await screen.findByText('Davíd Roggér')).toBeVisible();
    expect(await screen.findByText('Gale')).toBeVisible();
  });

  it('Should have a edit button for each table row', async () => {
    render(<TalkersSection />);
    const allEditBtns = await screen.findAllByTestId('test-edit-button');
    expect(allEditBtns).toHaveLength(3);
  });

  it('Should reveal a confirm and cancel button, after clicking in the edit button', async () => {
    render(<TalkersSection />);

    const [editBtn] = await screen.findAllByTestId('test-edit-button');
    await userEvent.click(editBtn);
    const confirmBtn = await screen.findByTestId('test-confirm-button');
    const cancelBtn = await screen.findByTestId('test-cancel-button');

    expect(confirmBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
  });

  it('Should be able to access an input to update the name', async () => {
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByTestId('test-edit-button');
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

    const [jonasEditBtn] = await screen.findAllByTestId('test-edit-button');
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const cancelBtn = await screen.findByTestId('test-cancel-button');

    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    await userEvent.click(cancelBtn);
    expect(talkerInputUpdate).not.toBeInTheDocument();
    expect(await screen.findByText(currentTalkerName)).toBeVisible();
  });

  it('Should disable the send button when has less than 3 letters', async () => {
    const mockAPI = jest
      .spyOn(api, 'put')
      .mockImplementation(
        (endpoint:string, payload) => fakeTalkerUpdate(endpoint, payload),
      );

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');

    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByTestId('test-edit-button');
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const confirmBtn = await screen.findByTestId('test-confirm-button');
    expect(confirmBtn).toBeDisabled();

    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, 'jo');
    expect(confirmBtn).toBeDisabled();

    await userEvent.clear(talkerInputUpdate);
    await userEvent.type(talkerInputUpdate, 'j');
    expect(confirmBtn).toBeDisabled();

    expect(mockAPI).toHaveBeenCalledTimes(0);
  });

  it('Should send a request for update when clicking in the confirm button', async () => {
    const mockAPI = jest
      .spyOn(api, 'put')
      .mockImplementation(
        (endpoint:string, payload) => fakeTalkerUpdate(endpoint, payload),
      );

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');

    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByTestId('test-edit-button');
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const confirmBtn = await screen.findByTestId('test-confirm-button');

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

  it('Should have a delete button for each talker', async () => {
    render(<TalkersSection />);
    const allEditBtns = await screen.findAllByTestId('test-delete-button');
    expect(allEditBtns).toHaveLength(3);
  });

  describe('When trying to delete a talker', () => {
    it('Should popup an message to confirme the delete action', async () => {
      render(<TalkersSection />);
      const [jonasDeleteBtn] = await screen.findAllByTestId('test-delete-button');

      await userEvent.click(jonasDeleteBtn);

      expect(await screen.findByText('Please confirm to exclude:')).toBeVisible();
      expect(await screen.findByTestId('test-highlight-delete-name')).toHaveTextContent('Jonas Doe');
      expect(await screen.findByRole('button', { name: 'Yes' })).toBeVisible();
      expect(await screen.findByRole('button', { name: 'No' })).toBeVisible();
    });

    it('Should close the popup when clicked in the "no" option', async () => {});
  });
});
