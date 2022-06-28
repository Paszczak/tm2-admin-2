// FormFieldType is a model for form fileds format in form state definition
export type FormFieldType = {
  label: string;
  value: string;
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
