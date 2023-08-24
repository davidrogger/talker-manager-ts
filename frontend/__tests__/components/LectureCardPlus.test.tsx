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

    const talkers = await screen.findAllByRole('option');

    expect(talkers).toHaveLength(3);

    const titleElement = await screen.findByTestId('test-title-input');
    expect(titleElement).toBeVisible();
    expect(titleElement).toHaveValue('');

    const newInput = 'New Test title';
    await userEvent.type(titleElement, newInput);
    expect(titleElement).toHaveValue(newInput);
  });

  it('Should render select with all talkers', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    render(<LectureCardWithContext />);

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');
    await userEvent.click(buttonElement);

    const talkers = await screen.findAllByRole<HTMLOptionElement>('option');
    const [talker1, talker2] = talkers;
    const selectElement = await screen.findByRole<HTMLSelectElement>('combobox');

    expect(selectElement).toBeVisible();
    expect(talkers).toHaveLength(3);
    expect(talker1.selected).toBeTruthy();
    await userEvent.selectOptions(selectElement, talker2);
    expect(talker2.selected).toBeTruthy();
    expect(talker1.selected).toBeFalsy();
  });

  it('Should render a date picker', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    render(<LectureCardWithContext />);

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');
    await userEvent.click(buttonElement);

    const dateElement = await screen.findByTestId<HTMLInputElement>('date-picker');

    expect(dateElement).toBeVisible();
    expect(dateElement).toHaveValue('2023-08-24');
    await userEvent.clear(dateElement);
    await userEvent.type(dateElement, '2024-08-25');
    expect(dateElement).toHaveValue('2024-08-25');
  });

  it('Should render a "confirm" and "cancel" button', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    render(<LectureCardWithContext />);

    const buttonElement = screen.getByRole<HTMLButtonElement>('button');
    await userEvent.click(buttonElement);

    expect(await screen.findByTestId('test-confirm-button')).toBeVisible();
    expect(await screen.findByTestId('test-cancel-button')).toBeVisible();
  });

  it('Should remove the inputs and render the original content', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    render(<LectureCardWithContext />);

    await userEvent.click(screen.getByRole<HTMLButtonElement>('button'));

    const titleElement = await screen.findByTestId('test-title-input');
    const selectElement = await screen.findByTestId('test-select-talker');
    const dateElement = await screen.findByTestId('date-picker');

    const cancelBtn = await screen.findByTestId('test-cancel-button');
    await userEvent.click(cancelBtn);

    expect(titleElement).not.toBeInTheDocument();
    expect(selectElement).not.toBeInTheDocument();
    expect(dateElement).not.toBeInTheDocument();

    expect(screen.getByRole<HTMLButtonElement>('button')).toBeVisible();
  });
});
