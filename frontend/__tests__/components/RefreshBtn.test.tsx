import RefreshWindow from '@/components/RefreshWindow';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderMockContextProviderNavigation from '../utils/RenderMockContextProviderNavigation';

describe('Testing component <RefreshWindow />', () => {
  it('Should display the text provide by the props in the button', () => {
    const expectedText = 'Testing Refresh Button';
    RenderMockContextProviderNavigation(<RefreshWindow message={expectedText} />);
    expect(screen.getByText(expectedText)).toBeVisible();
  });

  it('Should call router refresh when clicked', async () => {
    const { mockRouter } = RenderMockContextProviderNavigation(<RefreshWindow message='testing' />);
    const refreshBtn = screen.getByText('Refresh');
    await userEvent.click(refreshBtn);
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
