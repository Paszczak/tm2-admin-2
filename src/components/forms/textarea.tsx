// Styles
import { useValidation } from '../../hooks/use-validation';
import classes from './textarea.module.scss';

// Textarea props definition
type TextareaProps = {
  key?: string;
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  htmlProps?: {
    rows?: number;
  };
  validation?: {
    type: string;
    value?: number;
  };
  errorMessage?: string;
  touched: boolean;
};

export function Textarea({
  id,
  label,
  value,
  onChange,
  validation,
  htmlProps,
  errorMessage,
  touched,
}: TextareaProps): JSX.Element {
  const isValid = useValidation({ validation, value });
  return (
    <div className={classes.row}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={[
          classes.input,
          !isValid && touched && classes.invalid,
          isValid && touched && classes.valid,
        ].join(' ')}
        value={value}
        {...htmlProps}
        onChange={(event) => onChange(event.target.value)}></textarea>
      {!isValid && touched && <small>{errorMessage}</small>}
    </div>
  );
}
