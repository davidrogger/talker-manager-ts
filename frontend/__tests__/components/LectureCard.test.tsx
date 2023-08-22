import LectureCard from '@/components/LectureCard';
import { render, screen } from '@testing-library/react';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import userEvent from '@testing-library/user-event';
import { api } from '@/services/api';
import { normizeDateToDatePicker } from '@/utils/dateHandler';
import { mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing <LectureCard />', () => {
  const lectureCardTestingProps = {
    id: 'valid-id',
    talkerName: 'Jonas Doe',
    title: 'Testing Card',
    watchedAt: '17/08/2023',
  };

  const RenderLectureCardAuthenticated = () => (
    <AuthContext.Provider value={ { isAuthenticated: true } as IAuthContext }>
      <LectureCard lecture={lectureCardTestingProps} />
    </AuthContext.Provider>
  );

  it('Should render the talkerName, title and watchedAt', () => {
    const expectedLectureCard = { ...lectureCardTestingProps };

    render(<LectureCard lecture={expectedLectureCard}/>);

    expect(screen.getByText(expectedLectureCard.talkerName)).toBeVisible();
    expect(screen.getByText(expectedLectureCard.title)).toBeVisible();
    expect(screen.getByText(expectedLectureCard.watchedAt)).toBeVisible();
  });

  it('Should render the edit and delete button when logged', async () => {
    render(<RenderLectureCardAuthenticated />);

    const editBtn = screen.getByTestId('test-edit-button');
    const deleteBtn = screen.getByTestId('test-delete-button');

    expect(editBtn).toBeVisible();
    expect(deleteBtn).toBeVisible();
  });

  describe('When change to editable mode, after clicked in edit button', () => {
    const { talkerName, title, watchedAt } = lectureCardTestingProps;
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });

    it('Should have an input element title visible', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);
      expect(screen.getByDisplayValue(title)).toBeVisible();
    });

    it('Should have a list of talker with the right talker selected', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      expect(screen.getAllByRole('option')).toHaveLength(3);
      const talkerSelected = await screen.findByRole<HTMLOptionElement>('option', { name: talkerName });
      expect(talkerSelected.selected).toBeTruthy();
    });

    it('Should have a date picker element with the correct date', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      expect(screen.getByTestId('date-picker')).toHaveValue(normizeDateToDatePicker(watchedAt));
    });

    it('Should have the buttons to confirm or cancel the change in the card', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      expect(screen.getByTestId('test-confirm-button')).toBeVisible();
      expect(screen.getByTestId('test-cancel-button')).toBeVisible();
    });
  });

  describe('When in Editing mode', () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    it('Should be able to change the lecture title', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const titleInput = screen.getByDisplayValue(lectureCardTestingProps.title);
      const newTitle = 'New title test';
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, newTitle);

      expect(titleInput).toHaveValue(newTitle);
    });

    it('Should be able to select a new talker name', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const talkerSelection = screen.getByRole('combobox');
      const galeTalker = screen.getByRole<HTMLOptionElement>('option', { name: 'Gale' });
      const jonasTalker = screen.getByRole<HTMLOptionElement>('option', { name: 'Jonas Doe' });

      await userEvent.selectOptions(talkerSelection, galeTalker);
      expect(galeTalker.selected).toBeTruthy();
      expect(jonasTalker.selected).toBeFalsy();
    });

    it('Should be able to change de date picker', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const datePickerElement = screen.getByTestId<HTMLInputElement>('date-picker');
      const newDate = '2023-10-10';

      await userEvent.clear(datePickerElement);
      await userEvent.type(datePickerElement, newDate);

      expect(datePickerElement).toHaveValue(newDate);
    });
  });
});
