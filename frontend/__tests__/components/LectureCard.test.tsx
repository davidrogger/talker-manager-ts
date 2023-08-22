import LectureCard from '@/components/LectureCard';
import { render, screen } from '@testing-library/react';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import userEvent from '@testing-library/user-event';
import { api } from '@/services/api';
import { normizeDateToDatePicker } from '@/utils/dateHandler';
import { expectedLectureUpdateRequest, mockGetTalkersResponse } from '../utils/_mockData';
import {
  changeDate, changeTalker, changeTitle, lectureCardTestingProps,
} from '../utils';

describe('Testing <LectureCard />', () => {
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

      const { titleInput, newTitle } = await changeTitle();

      expect(titleInput).toHaveValue(newTitle);
    });

    it('Should be able to select a new talker name', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const { galeTalker, jonasTalker } = await changeTalker();

      expect(galeTalker.selected).toBeTruthy();
      expect(jonasTalker.selected).toBeFalsy();
    });

    it('Should be able to change de date picker', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const { datePickerElement, newDate } = await changeDate();

      expect(datePickerElement).toHaveValue(newDate);
    });

    it('Should rollback all data, when clicked at the cancel button', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const { titleInput } = await changeTitle();
      const { talkerSelection } = await changeTalker();
      const { datePickerElement } = await changeDate();

      const cancelBtn = screen.getByTestId('test-cancel-button');
      await userEvent.click(cancelBtn);

      const { title, talkerName, watchedAt } = lectureCardTestingProps;

      expect(titleInput).not.toBeVisible();
      expect(screen.getByRole('heading', { name: title })).toBeVisible();

      expect(talkerSelection).not.toBeVisible();
      expect(screen.getByText(talkerName)).toBeVisible();

      expect(datePickerElement).not.toBeVisible();
      expect(screen.getByText(watchedAt)).toBeVisible();
    });

    it('Should enable the confirm button when the title is changed', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const confirmBtn = screen.getByTestId('test-confirm-button');

      expect(confirmBtn).toBeDisabled();

      await changeTitle();
      expect(confirmBtn).toBeEnabled();

      await changeTitle(lectureCardTestingProps.title);
      expect(confirmBtn).toBeDisabled();
    });

    it('Should enable the confirm button when the talker name is changed', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const confirmBtn = screen.getByTestId('test-confirm-button');

      expect(confirmBtn).toBeDisabled();

      await changeTalker();
      expect(confirmBtn).toBeEnabled();

      await changeTalker(0);
      expect(confirmBtn).toBeDisabled();
    });

    it('Should enable the confirm button when the date is changed', async () => {
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      const confirmBtn = screen.getByTestId('test-confirm-button');

      expect(confirmBtn).toBeDisabled();

      await changeDate();
      expect(confirmBtn).toBeEnabled();

      await changeDate('2023-08-17');
      expect(confirmBtn).toBeDisabled();
    });

    it('Should send the update to the API when clicked at the confirm button', async () => {
      const mockAPI = jest.spyOn(api, 'put');
      render(<RenderLectureCardAuthenticated />);
      const editBtn = screen.getByTestId('test-edit-button');
      await userEvent.click(editBtn);

      await changeTitle();
      await changeTalker();
      await changeDate();

      const confirmBtn = screen.getByTestId('test-confirm-button');
      await userEvent.click(confirmBtn);

      expect(mockAPI).toHaveBeenCalledTimes(1);
      expect(mockAPI)
        .toHaveBeenCalledWith(
          '/lecture/valid-id',
          expectedLectureUpdateRequest,
          { headers: { Authorization: 'valid-token' } },
        );
    });
  });
});
