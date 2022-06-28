import { ReactNode, MouseEvent } from 'react';

import classes from './list.module.scss';

type ListProps<ListItem> = {
  items: ListItem[];
  style?: any;
  testId?: string;
  render: (item: ListItem) => ReactNode;
  onElementClick: (item: ListItem) => void;
};

export function List<ListItem>({
  items,
  style,
  testId,
  render,
  onElementClick,
}: ListProps<ListItem>) {
  return (
    <ul
      className={[classes.list, classes.slideFromBottom].join(' ')}
      style={style}
      data-testid={testId}>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={(event: MouseEvent<HTMLLIElement>) => {
            event.stopPropagation();
            onElementClick(item);
          }}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}
