import { render, screen } from '@testing-library/react';
import { NewsItem } from './news-item';

test('has title, body and created', () => {
  // const consoleOutput = [];

  render(
    <NewsItem
      id='123'
      slug='news-1'
      title='News 1'
      lead='Lorem ipsum'
      body='Lorem ipsum dolor'
      publish={true}
      created='1647598048765'
    />
  );

  expect(screen.getByRole('heading')).toHaveTextContent('News 1');
  expect(screen.getByRole('paragraph')).toHaveTextContent(/lorem ipsum/i);
  expect(screen.getByRole('time')).toHaveTextContent('18 marca 2022, 11:07:28');
});
