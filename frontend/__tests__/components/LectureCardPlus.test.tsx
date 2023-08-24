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

  it('Should remove the inputs and render the original content when clicked in "confirm" button', async () => {
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

  it('Should request the api to create a new lecture when clicked in "confirm" button', async () => {
    const token = 'valid-token';
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue(token);
    jest.spyOn(api, 'get').mockResolvedValue({ data: { talkers: mockGetTalkersResponse } });
    const mockAPI = jest.spyOn(api, 'post');

    const [talkerSelected] = mockGetTalkersResponse;

    const payload = {
      talkerId: talkerSelected.id,
      title: 'New title test',
      watchedAt: '10/10/2025',
    };

    render(<LectureCardWithContext />);

    await userEvent.click(screen.getByRole<HTMLButtonElement>('button'));

    const titleElement = await screen.findByTestId('test-title-input');
    await userEvent.type(titleElement, payload.title);

    const selectElement = await screen.findByTestId<HTMLSelectElement>('test-select-talker');
    const [talker1] = await screen.findAllByRole<HTMLOptionElement>('option');
    await userEvent.selectOptions(selectElement, talker1);

    const dateElement = await screen.findByTestId('date-picker');
    await userEvent.clear(dateElement);
    await userEvent.type(dateElement, '2025-10-10');

    const confirmBtn = await screen.findByTestId('test-confirm-button');
    await userEvent.click(confirmBtn);

    expect(mockAPI).toHaveBeenCalledWith('/lecture', payload, { headers: { Authorization: token } });
  });
});
