import InputText from '@/components/InputText';
import { render, screen } from '@testing-library/react';

describe('Testing Component <InputText />', () => {
  it('It should render the placeholder correctly', async () => {
    render(<InputText placeholder='Test'/>);

    const inputText = screen.getByPlaceholderText('Test');
    expect(inputText).toBeInTheDocument();
  });
});
