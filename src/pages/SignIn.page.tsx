// Node libs
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Contexts
import { useAuth } from '../hooks/use-auth';

// Components
import { FormField } from '../components/forms/form-field';
import { Button } from '../components/forms/button';
import { ErrorMessage } from '../components/layout/errorMessage';

// Models
import { FormFieldType } from '../models/forms';

// Libs
import { onInputChangeHandler } from '../libs/forms';

// Styles
import classes from '../styles/_pages.module.scss';

// SignInControlType is
type SignInContolsType = {
  email: FormFieldType;
  password: FormFieldType;
};

// SignIn is the main 'sign-in/' route rendering component
export default function SignIn(): JSX.Element {
  const [form, formSet] = useState<{ controls: SignInContolsType }>({
    controls: {
      email: {
        label: 'Email',
        value: '',
        htmlProps: {
          type: 'text',
        },
        validation: { type: 'isEmail' },
        errorMessage: 'Wprowadź poprawny adres email',
        touched: false,
      },
      password: {
        label: 'Hasło',
        value: '',
        htmlProps: {
          type: 'password',
        },
        validation: { type: 'minLength', value: 8 },
        errorMessage: 'Hasło musi zawierać co najmniej 8 znaków',
        touched: false,
      },
    },
  });

  const { user, errorMessage, signIn } = useAuth();

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    signIn(form.controls.email.value, form.controls.password.value);
  };

  return user ? (
    <Navigate to='/' replace />
  ) : (
    <div className={classes.signinPage}>
      <h1>Zaloguj się do systemu</h1>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
        {Object.keys(form.controls).map((key) => (
          <FormField
            key={key}
            id={key}
            label={form.controls[key as keyof SignInContolsType].label}
            value={form.controls[key as keyof SignInContolsType].value}
            onChange={(value: string) =>
              onInputChangeHandler<SignInContolsType>(
                key,
                value,
                form.controls,
                formSet
              )
            }
            htmlProps={form.controls[key as keyof SignInContolsType].htmlProps}
            validation={
              form.controls[key as keyof SignInContolsType].validation
            }
            errorMessage={
              form.controls[key as keyof SignInContolsType].errorMessage
            }
            touched={form.controls[key as keyof SignInContolsType].touched}
          />
        ))}
        <Button label='Zaloguj' type='submit' light />
      </form>
    </div>
  );
}
