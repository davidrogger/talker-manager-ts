import LectureCardPlus from '@/components/LectureSection/LectureCardPlus';
import { AuthContext, IAuthContext } from '@/contexts/Auth';
import { LectureProvider } from '@/contexts/Lectures';
import { render, screen } from '@testing-library/react';
import plusImg from '@/images/plus.svg';
import { ClassAttributes, ImgHTMLAttributes } from 'react';

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
});
