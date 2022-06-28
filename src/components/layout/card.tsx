import { ReactNode } from 'react';

import classes from './card.module.scss';

type CardProps = {
  key: string;
  id: string;
  children: ReactNode;
  onClick?: () => void;
  slug?: string;
};

export function Card({ id, children, onClick, slug }: CardProps): JSX.Element {
  return (
    <div
      className={[classes.card, onClick && classes.clickable].join(' ')}
      onClick={onClick}
      role='button'
      data-id={id}
      data-slug={slug}>
      {children}
    </div>
  );
}
