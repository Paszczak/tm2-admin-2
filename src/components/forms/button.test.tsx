import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

test('has label and can be clicked', () => {
  let consoleOutput: string[] = [];
  render(
    <Button label='Test me' onClick={() => consoleOutput.push('Clicked')} />
  );

  const button = screen.getByRole('button', { name: 'Test me' });
  fireEvent.click(button);
  expect(consoleOutput).toEqual(['Clicked']);
});
