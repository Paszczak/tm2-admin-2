import classes from './button.module.scss';

type ButtonProps = {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  light?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ label, type, light, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={light ? classes.buttonLight : classes.buttonFilled}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
}
