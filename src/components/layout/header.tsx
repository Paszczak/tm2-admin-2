// Components
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/close-circle-outline.svg';

// Styles
import classes from './header.module.scss';

// Header props
type HeaderProps = {
  children: string;
  shouldReturn?: boolean;
};

export function Header({ children, shouldReturn }: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const timer = setTimeout(() => console.log('[HEADER] Layout Effect'), 1000);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    console.log('[HEADER] Effect');
  }, []);

  return (
    <div className={classes.header}>
      <h1 className={classes.title}>{children}</h1>
      {shouldReturn && (
        <div className={classes.icon} onClick={() => navigate(-1)}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
}
