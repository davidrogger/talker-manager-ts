import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Testing Library', () => {
  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('link', { name: /learn/i });
    expect(heading).toBeInTheDocument();
  });
});
