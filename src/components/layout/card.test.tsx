import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './card';

test('has defined content and can be clicked', () => {
  let consoleOutput: string[] = [];
  render(
    <Card key='123' id='123' onClick={() => consoleOutput.push('Clicked')}>
      Lorem ipusm dolor
    </Card>
  );

  const card = screen.getByRole('button');
  fireEvent.click(card);
  expect(consoleOutput).toEqual(['Clicked']);
  expect(card).toContainHTML('Lorem ipusm dolor');
});
