import InputPass from '@/components/InputPass';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testing Component <InputPass />', () => {
  it('It should change the input type when clicked in the exchange button', async () => {
    render(<InputPass placeholder='Password' />);

    const inputPass = screen.getByPlaceholderText('Password');
    const btnExchange = screen.getByRole('img');

    expect(inputPass).toHaveAttribute('type', 'password');

    await userEvent.click(btnExchange);
    expect(inputPass).toHaveAttribute('type', 'text');
  });
});
