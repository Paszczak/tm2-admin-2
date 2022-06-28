import { createPortal } from 'react-dom';

// Styles
import classes from './backdrop.module.scss';

// Backdrop props
type BackdropProps = {
  onClick: () => void;
};

export function Backdrop({ onClick }: BackdropProps): JSX.Element {
  const backrdopRoot = document.getElementById(
    'backdrop-root'
  ) as HTMLDivElement;
  return createPortal(
    <div className={classes.backdrop} onClick={onClick} />,
    backrdopRoot
  );
}
