import { render, screen } from '@testing-library/react';
import { Header } from './header';

test('renders correct content', () => {
  const title = 'Page title';
  render(<Header>{title}</Header>);

  expect(screen.getByText(title)).toBeVisible();
});
