import LectureCard from '@/components/LectureCard';
import { render, screen } from '@testing-library/react';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import userEvent from '@testing-library/user-event';

describe('Testing <LectureCard />', () => {
  const lectureCardTestingProps = {
    talkerName: 'Jonas Doe',
    title: 'Testing Card',
    watchedAt: '17/08/2023',
  };
  const RenderLectureCardAuthenticated = () => (
    <AuthContext.Provider value={ { isAuthenticated: true } as IAuthContext }>
      <LectureCard {...lectureCardTestingProps} />
    </AuthContext.Provider>
  );

  it('Should render the talkerName, title and watchedAt', () => {
    const expectedLectureCard = { ...lectureCardTestingProps };

    render(<LectureCard {...expectedLectureCard}/>);

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
    const { talkerName, title, watchedAt } = lectureCardTestingProps;

    render(<RenderLectureCardAuthenticated />);
    const editBtn = screen.getByTestId('test-edit-button');
    await userEvent.click(editBtn);

    expect(screen.getByDisplayValue(talkerName)).toBeVisible();
    expect(screen.getByDisplayValue(title)).toBeVisible();
    expect(screen.getByText(watchedAt)).toBeVisible();
    expect(screen.getByTestId('test-confirm-button')).toBeVisible();
    expect(screen.getByTestId('test-cancel-button')).toBeVisible();
  });
});
