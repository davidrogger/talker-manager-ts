import LectureCard from '@/components/LectureCard';
import { render, screen } from '@testing-library/react';
import { AuthContext, IAuthContext } from '@/contexts/Auth';

describe('Testing <LectureCard />', () => {
  const lectureCardTestingProps = {
    talkerName: 'Jonas Doe',
    title: 'Testing Card',
    watchedAt: '17/08/2023',
  };

  it('Should render the talkerName, title and watchedAt', () => {
    const expectedLectureCard = { ...lectureCardTestingProps };

    render(<LectureCard {...expectedLectureCard}/>);

    expect(screen.getByText(expectedLectureCard.talkerName)).toBeVisible();
    expect(screen.getByText(expectedLectureCard.title)).toBeVisible();
    expect(screen.getByText(expectedLectureCard.watchedAt)).toBeVisible();
  });

  it('Should render the edit and delete button when logged', async () => {
    render(
      <AuthContext.Provider value={ { isAuthencated: true } as unknown as IAuthContext }>
        <LectureCard {...lectureCardTestingProps} />
      </AuthContext.Provider>,
    );

    const editBtn = screen.getByTestId('test-edit-button');
    const deleteBtn = screen.getByTestId('test-delete-button');

    expect(editBtn).toBeVisible();
    expect(deleteBtn).toBeVisible();
  });
});
