// Styles
import classes from './errorMessage.module.scss';

// ErrorMessageProps
type ErrorMessageProps = {
  children: string;
};

export function ErrorMessage({ children }: ErrorMessageProps): JSX.Element {
  return <div className={classes.errorMessage}>{children}</div>;
}
