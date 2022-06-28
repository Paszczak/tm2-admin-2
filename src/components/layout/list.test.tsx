import { within, render, screen, fireEvent } from '@testing-library/react';
import { List } from './list';

const DUMMY_DATA = [
  { title: 'Title 1', content: 'Content 1' },
  { title: 'Title 2', content: 'Content 2' },
];

// test('can render list', () => {
//   const consoleOutput: string[] = [];

//   render(
//     <List
//       items={DUMMY_DATA}
//       render={(item) => (
//         <>
//           <h3>{item.title}</h3>
//           <p>{item.content}</p>
//         </>
//       )}
//       onElementClick={(item) => consoleOutput.push(item.title)}
//     />
//   );

//   const list = screen.getByRole('list');
//   expect(list).toBeVisible();

//   const { getAllByRole } = within(list);
//   const items = getAllByRole('listitem');
//   expect(items.length).toBe(2);

//   fireEvent.click(items[0]);
//   expect(consoleOutput).toEqual(['Title 1']);
// });
