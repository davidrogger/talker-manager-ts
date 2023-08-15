import AddNewTalker from '@/components/AddNewTalker';
import { api } from '@/services/api';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing Component <AddNewTalker />', () => {
  it('Should be able to click add just when have more than 3 character in the input', async () => {
    render(<AddNewTalker openWindow={() => 'closed'} />);

    const addBtn = screen.getByRole('button', { name: 'Add' });
    const inputNewTalker = screen.getByPlaceholderText('Type the name here...');

    await userEvent.type(inputNewTalker, 't');
    expect(addBtn).toBeDisabled();

    await userEvent.type(inputNewTalker, 'e');
    expect(addBtn).toBeDisabled();

    await userEvent.type(inputNewTalker, 't');
    expect(addBtn).toBeEnabled();

    await userEvent.type(inputNewTalker, '{backspace}');
    expect(addBtn).toBeDisabled();

    await userEvent.type(inputNewTalker, 't');
    expect(addBtn).toBeEnabled();
  });

  it('Should connect to the API when clicked in the "Add" button', async () => {
    const mockAPI = jest.spyOn(api, 'post').mockResolvedValue({ data: { talker: mockGetTalkersResponse[0] } });
    render(<AddNewTalker openWindow={() => 'closed'} />);

    const addBtn = screen.getByRole('button', { name: 'Add' });
    const inputNewTalker = screen.getByPlaceholderText('Type the name here...');

    await userEvent.type(inputNewTalker, 'Jonas Doe');
    await userEvent.click(addBtn);
    expect(mockAPI).toHaveBeenCalled();
  });
});
