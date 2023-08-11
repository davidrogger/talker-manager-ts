import TalkersSection from '@/components/TalkersSection';
import { render, screen } from '@testing-library/react';
import { api } from '@/services/api';
import img from '@/images/index';
import userEvent from '@testing-library/user-event';
import { ITalker } from '@/types';
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

    const allEditBtns = await screen.findAllByRole('button', { value: img.edit });
    expect(allEditBtns).toHaveLength(3);
    await userEvent.click(allEditBtns[0]);
  });

  it('Should reveal a confirm and cancel button, after clicking in the edit button', async () => {
    render(<TalkersSection />);

    const [editBtn] = await screen.findAllByRole('button', { value: img.edit });
    await userEvent.click(editBtn);
    const confirmBtn = await screen.findByRole('button', { value: img.confirm });
    const cancelBtn = await screen.findByRole('button', { value: img.cancel });

    expect(confirmBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
  });

  it('Should be able to access an input to added the update name', async () => {
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByRole('button', { value: img.edit });
    await userEvent.click(jonasEditBtn);

    const talkerInputUpdate = await screen.findByDisplayValue('Jonas Doe');
    expect(talkerInputUpdate).toBeVisible();
    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.type(talkerInputUpdate, textInputUpdate);
    expect(talkerInputUpdate).toHaveTextContent(textInputUpdate);
  });

  it('Should revert the changes if clicked in the cancel button', async () => {
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByRole('button', { value: img.edit });
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const cancelBtn = await screen.findByRole('button', { value: img.cancel });
    expect(talkerInputUpdate).toBeVisible();

    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    await userEvent.click(cancelBtn);
    expect(talkerInputUpdate).not.toBeInTheDocument();
    expect(await screen.findByText(currentTalkerName)).toBeVisible();
  });
  it('Should send a request for update when clicking in the confirm button', async () => {
    const mockAPI = jest
      .spyOn(api, 'post')
      .mockImplementation(
        (endpoint:string, payload) => fakeTalkerUpdate(endpoint, payload),
      );
    render(<TalkersSection />);

    const [jonasEditBtn] = await screen.findAllByRole('button', { value: img.edit });
    await userEvent.click(jonasEditBtn);

    const currentTalkerName = 'Jonas Doe';
    const talkerInputUpdate = await screen.findByDisplayValue(currentTalkerName);
    const confirmBtn = await screen.findByRole('button', { value: img.confirm });

    const textInputUpdate = 'Jonas Doe Tester';
    await userEvent.type(talkerInputUpdate, textInputUpdate);

    await userEvent.click(confirmBtn);
    expect(mockAPI).toHaveBeenCalled();

    expect(await screen.findByText(textInputUpdate)).toBeVisible();
  });
});
