// Node libs
import { useRef } from 'react';

// Hooks
import { useValidation } from '../../hooks/use-validation';

// Components
import { ReactComponent as BoldIcon } from '../../assets/format-bold.svg';
import { ReactComponent as ItalicIcon } from '../../assets/format-italic.svg';
import { ReactComponent as ListIcon } from '../../assets/format-list.svg';

// Style
import classes from './rich-textarea.module.scss';

// Textarea props definition
type RichTextareaProps = {
  key?: string;
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  htmlProps?: {
    type?: string;
    rows?: number;
  };
  validation?: {
    type: string;
    value?: number;
  };
  errorMessage?: string;
  touched: boolean;
};

export function RichTextarea({
  id,
  label,
  value,
  onChange,
  htmlProps,
  validation,
  errorMessage,
  touched,
}: RichTextareaProps): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isValid = useValidation({ validation, value });

  const onStyleButtonPress = (type: string) => {
    // Retive value and selection ends
    const currentValue = inputRef.current?.value;
    const textStart = inputRef.current?.selectionStart;
    const textEnd = inputRef.current?.selectionEnd;

    // Slice input to insert markdowns
    const textArray = [
      currentValue?.slice(0, textStart),
      currentValue?.slice(textStart, textEnd),
      currentValue?.slice(textEnd, currentValue.length),
    ];

    // Insert markdowns
    switch (type) {
      case 'bold':
        textArray[1] = ` **${textArray[1]}** `;
        break;
      case 'italic':
        textArray[1] = ` *${textArray[1]}* `;
        break;
      case 'list':
        textArray[1] = `

- ...
- ...
- ...
        
`;
        break;
    }

    // Build updated textarea value
    const updatedValue = textArray.join('');

    // Upadte textarea value
    onChange(updatedValue);
    if (inputRef.current) inputRef.current.value = updatedValue;
  };

  return (
    <div className={classes.row}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <div className={classes.info}>
        Pole używa markdown.{' '}
        <a
          href='https://www.markdownguide.org/cheat-sheet/'
          target='_blank'
          rel='noreferrer'>
          Więcej o nim jest tu.
        </a>
      </div>
      <div className={classes.inputContainer}>
        <textarea
          id={id}
          className={classes.input}
          value={value}
          {...htmlProps}
          onChange={(event) => onChange(event.target.value)}
          ref={inputRef}></textarea>
        <div className={classes.controls}>
          <span
            className={classes.styleIcon}
            onClick={() => onStyleButtonPress('bold')}>
            <BoldIcon />
          </span>
          <span
            className={classes.styleIcon}
            onClick={() => onStyleButtonPress('italic')}>
            <ItalicIcon />
          </span>
          <span
            className={classes.styleIcon}
            onClick={() => onStyleButtonPress('list')}>
            <ListIcon />
          </span>
        </div>
      </div>
      {!isValid && touched && <small>{errorMessage}</small>}
    </div>
  );
}
