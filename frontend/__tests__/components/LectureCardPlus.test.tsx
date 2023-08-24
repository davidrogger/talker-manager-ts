import LectureCardPlus from '@/components/LectureSection/LectureCardPlus';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import { LectureProvider } from '@/contexts/Lectures';
import { api } from '@/services/api';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGetTalkersResponse } from '../utils/_mockData';

describe('Testing Component <LectureCardPlus />', () => {
  beforeEach(jest.restoreAllMocks);

  const mockAuthContextValue = {
    authStoredToken: jest.fn(),
    isAuthenticated: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    user: null,
  } as IAuthContext;

  const LectureCardWithContext = () => (
    <AuthContext.Provider value={ mockAuthContextValue }>
      <LectureProvider>
        <LectureCardPlus />
      </LectureProvider>
    </AuthContext.Provider>
  );

  it('Should have a button with an plus image', async () => {
    render(<LectureCardWithContext />);

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');
    const imageElement = screen.getByRole<HTMLImageElement>('img');

    expect(buttonElement).toBeVisible();
    expect(imageElement).toBeVisible();
    expect(buttonElement).toContainElement(imageElement);
  });

  it('Should render inputtable title', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    render(<LectureCardWithContext />);

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');
    await userEvent.click(buttonElement);

    const titleElement = await screen.findByTestId('test-title-input');
    expect(titleElement).toBeVisible();
    expect(titleElement).toHaveValue('');

    const newInput = 'New Test title';
    await userEvent.type(titleElement, newInput);
    expect(titleElement).toHaveValue(newInput);
  });
});
