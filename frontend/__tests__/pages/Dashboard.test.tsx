import { screen } from '@testing-library/react';
import RenderPage from '../utils/RenderPage';

describe.only('Testing page Dashboard', () => {
  it('Should render the header component', () => {
    RenderPage({ route: '/dashboard' });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('header-container-id')).toBeInTheDocument();
  });
});
