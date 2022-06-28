// Libs
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Animations
// import { animated } from 'react-spring';

// Components
import { ReactComponent as CloseIcon } from '../../assets/close-circle-outline.svg';

// Styles
import classes from './modal.module.scss';

// Modal props definition
type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  mounted: boolean;
};

export function Modal({
  title,
  onClose,
  children,
  mounted,
}: ModalProps): React.ReactPortal | null {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  return createPortal(
    <div
      className={[
        classes.modal,
        mounted ? classes.slideFromTop : classes.fadeOut,
      ].join(' ')}
      role='alert'>
      <div className={classes.header}>
        <div className={classes.icon} onClick={onClose} role='button'>
          <CloseIcon />
        </div>
        <h3>{title}</h3>
      </div>
      <article className={classes.content}>{children}</article>
    </div>,
    modalRoot
  );
}
