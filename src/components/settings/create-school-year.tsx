import { gql, useMutation } from '@apollo/client';
import { useRef } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../forms/button';

export const CREATE_YEAR = gql`
  mutation CreateYear($schoolYear: YearInput, $token: String) {
    createYear(schoolYear: $schoolYear, token: $token) {
      code
      success
      message
      year {
        id
        name
        current
      }
    }
  }
`;

export function CreateSchoolYear(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [createYear] = useMutation(CREATE_YEAR);
  const { user } = useAuth();

  const onYearSubmitHandler = () => {
    createYear({
      variables: {
        schoolYear: inputRef.current?.value,
        token: user?.token,
      },
    });
  };

  return (
    <>
      <div className='row'>
        <label htmlFor='school-year'>Nazwa</label>
        <input type='text' id='school-year' ref={inputRef} />
      </div>
      <Button label='Utwórz' onClick={onYearSubmitHandler} />
    </>
  );
}
