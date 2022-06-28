import { Input } from './input';
import { RichTextarea } from './rich-textarea';
import { Textarea } from './textarea';

// FromField props definition
type FormFieldProps = {
  key?: string;
  id: string;
  label: string;
  value: string;
  onChange: (value: string, checked?: boolean) => void;
  element?: string;
  htmlProps?: {
    type?: string;
    rows?: number;
    checked?: boolean;
  };
  validation?: { type: string; value?: number };
  errorMessage: string;
  touched: boolean;
};

export function FormField(props: FormFieldProps) {
  let formElement = null;
  switch (props.element) {
    case 'textarea':
      formElement = <Textarea {...props} />;
      break;
    case 'rich-textarea':
      formElement = <RichTextarea {...props} />;
      break;
    default:
      formElement = <Input {...props} />;
  }
  return formElement;
}
