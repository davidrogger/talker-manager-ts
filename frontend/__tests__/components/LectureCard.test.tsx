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

  it('Should change to editable mode element after clicked in the edit button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    const { talkerName, title, watchedAt } = lectureCardTestingProps;

    render(<RenderLectureCardAuthenticated />);
    const editBtn = screen.getByTestId('test-edit-button');
    await userEvent.click(editBtn);

    expect(await screen.findByRole('option', { name: talkerName })).toBeVisible();
    expect(screen.getByDisplayValue(title)).toBeVisible();
    expect(screen.getByTestId('date-picker')).toHaveValue(normizeDateToDatePicker(watchedAt));
    expect(screen.getByTestId('test-confirm-button')).toBeVisible();
    expect(screen.getByTestId('test-cancel-button')).toBeVisible();
  });
});
