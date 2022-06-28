import { ReactNode, MouseEvent } from 'react';

import classes from './list.module.scss';

type FeaturedListProps<ListItem extends { id: string; slug?: string }> = {
  items: ListItem[];
  style?: any;
  testId?: string;
  columns?: 2 | 3;
  render: (item: ListItem) => ReactNode;
  onElementClick: (item: string | null, slug?: string | null) => void;
};

export function FeaturedList<ListItem extends { id: string; slug?: string }>({
  items,
  style,
  testId,
  columns,
  render,
  onElementClick,
}: FeaturedListProps<ListItem>) {
  return (
    <ul
      className={[
        classes.list,
        classes.slideFromBottom,
        columns ? (columns === 2 ? classes.gridCol2 : classes.gridCol3) : '',
      ].join(' ')}
      style={style}
      data-testid={testId}
      onClick={(event: MouseEvent) => {
        if (event.target instanceof Element)
          onElementClick(
            event.target.getAttribute('data-id'),
            event.target.getAttribute('data-slug')
          );
      }}>
      {items.map((item) => (
        <li key={item.id} data-id={item.slug}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}
