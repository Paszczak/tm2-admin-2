// useValidation is a custom hook for validating form input fileds agains validation rules
export function useValidation({
  validation,
  value,
}: {
  validation?:
    | {
        type: string;
        value?: number;
      }
    | undefined;
  value: string | number;
}) {
  if (validation === undefined) return true;
  if (validation) {
    switch (validation.type) {
      case 'minLength':
        if (typeof value === 'string' && validation.value)
          return value.length >= validation.value;
        return false;
      case 'isEmail':
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (typeof value === 'string') return pattern.test(value);
        return false;
    }
  }
  return false;
}
