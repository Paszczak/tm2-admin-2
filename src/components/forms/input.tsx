// Hooks
import { useValidation } from '../../hooks/use-validation';

// Styles
import classes from './input.module.scss';

// Input props definition
type InputProps = {
  key?: string;
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string, checked?: boolean) => void;
  htmlProps?: {
    type?: string;
  };
  validation?: {
    type: string;
    value?: number;
  };
  errorMessage?: string;
  touched: boolean;
};

// Input defines contolled input field for forms
export function Input({
  id,
  label,
  value,
  onChange,
  htmlProps,
  validation,
  errorMessage,
  touched,
}: InputProps): JSX.Element {
  const isValid = useValidation({ validation, value });

  return (
    <div
      className={[
        classes.row,
        htmlProps?.type === 'checkbox' && classes.checkbox,
      ].join(' ')}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={[
          classes.input,
          !isValid && touched && classes.invalid,
          isValid && touched && classes.valid,
        ].join(' ')}
        value={value}
        {...htmlProps}
        onChange={(event) => onChange(event.target.value, event.target.checked)}
      />
      {!isValid && touched && <small>{errorMessage}</small>}
    </div>
  );
}
