import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './errorMessage';

test('can display error message', () => {
  const message = 'error';
  render(<ErrorMessage>{message}</ErrorMessage>);

  expect(screen.getByText(message)).toBeVisible();
});
