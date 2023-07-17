import Header from '@/components/Header';
import { render, screen } from '@testing-library/react';

describe('Testing Component <Header />', () => {
  it('Should render the title "Talker Manager"', () => {
    render(<Header />);
    const title = screen.getByRole('heading', { name: /talker manager/i });
    expect(title).toBeInTheDocument();
  });
});
