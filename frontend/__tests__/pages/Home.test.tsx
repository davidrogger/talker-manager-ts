import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Testing Home Page', () => {
  it('Should render all elements from the Home page', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
