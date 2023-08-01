import Dashboard from '@/app/dashboard/page';
import { render, screen } from '@testing-library/react';

describe('Testing page Dashboard', () => {
  it('Should render dashboard elements', () => {
    render(<Dashboard />);

    const title = screen.getByRole('heading', { name: 'Dashboard' });

    expect(title).toBeInTheDocument();
  });
});
