import Dashboard from '@/app/dashboard/page';
import { api } from '@/services/api';
import { screen } from '@testing-library/react';
import Header from '@/components/Header';
import RenderWithAuthProvider from '../utils/RenderWithAuthProvider';
import { mockUserDataResponse } from '../utils/_mockData';

describe('Testing page Dashboard', () => {
  beforeEach(
    () => {
      jest.restoreAllMocks();
      jest.mock('axios');
    },
  );

  it('Should render the name of the manager logged in the dashboard painel', async () => {
    const mockLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');
    const mockAPI = jest.spyOn(api, 'get').mockResolvedValue(mockUserDataResponse);

    RenderWithAuthProvider(<Dashboard />);

    expect(mockLocalStorage).toHaveBeenCalled();
    expect(mockAPI).toHaveBeenCalled();
    expect(await screen.findByTestId('welcome-name-id')).toHaveTextContent('Olá, Jonas Doe!');
  });

  it('Should redirect to home page when missing a token in the localStorage', async () => {
    const mockLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('');

    const { mockRouter } = RenderWithAuthProvider(<Dashboard />);

    expect(mockLocalStorage).toHaveBeenCalledWith('talker-token');
    await Promise.resolve();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('Should redirect to home page when the token is invalid', async () => {
    const mockResponse = { response: { data: { message: 'Invalid Token' } } };
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('invalid-token');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');
    const mockAPI = jest.spyOn(api, 'get').mockRejectedValue(mockResponse);

    const { mockRouter } = await RenderWithAuthProvider(<Dashboard />);

    await expect(mockAPI).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('Should be able to navigate to "home" and "dashboard" from the header when logged', async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');
    const mockClear = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');

    jest.spyOn(api, 'get').mockResolvedValue(mockUserDataResponse);

    const defaultRouterNextParams = { forceOptimisticNavigation: false, scroll: true };

    const { user, mockRouter } = RenderWithAuthProvider(
    <>
      <Header />
      <Dashboard />
    </>,
    );

    const logout = await screen.findByTestId('header-logout-nav-id');
    const dashboard = await screen.findByTestId('header-dashboard-nav-id');
    const home = await screen.findByTestId('header-home-nav-id');

    await user.click(home);
    expect(mockRouter.push).toHaveBeenCalledWith('/', defaultRouterNextParams);
    await user.click(dashboard);
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard', defaultRouterNextParams);
    await user.click(logout);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockClear).toHaveBeenCalled();
  });

  it('Should have two section talkers and lectures', async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValue('valid-token');
    jest.spyOn(api, 'get').mockResolvedValue(mockUserDataResponse);

    RenderWithAuthProvider(<Dashboard />);
    const talkerSection = await screen.findByText('Talkers Management');
    const lectureSection = await screen.findByText('Lectures Management');

    [talkerSection, lectureSection].map((section) => {
      expect(section).toBeInTheDocument();
      expect(section).toBeVisible();
      return 'done';
    });
  });
});
