import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

test('can enter text data', () => {
  const onChange = jest.fn();
  render(
    <Input
      id='key'
      label='Input'
      value='aaa@aa.p'
      validation={{ type: 'isEmail' }}
      onChange={onChange}
      errorMessage='Error'
      touched={true}
    />
  );

  expect(screen.getByLabelText('Input')).toBeVisible();
  userEvent.type(screen.getByLabelText('Input'), 'a');

  expect(onChange).toBeCalled();
});

test('can validate fake email', () => {
  const onChange = jest.fn();
  render(
    <Input
      id='key'
      label='Input'
      value='aaa@aa.p'
      validation={{ type: 'isEmail' }}
      onChange={onChange}
      errorMessage='Error'
      touched={true}
    />
  );

  expect(screen.getByText('Error')).toBeVisible();
});

test('can validate correct email', () => {
  const onChange = jest.fn();
  render(
    <Input
      id='key'
      label='Input'
      value='aaa@aa.pl'
      validation={{ type: 'isEmail' }}
      onChange={onChange}
      errorMessage='Error'
      touched={true}
    />
  );

  expect(screen.queryByText('Error')).toBeNull();
});

test('can validate password length', () => {
  const onChange = jest.fn();
  render(
    <Input
      id='key'
      label='Input'
      value='Passaaaaaa'
      validation={{ type: 'minLength', value: 8 }}
      onChange={onChange}
      errorMessage='Error'
      touched={true}
    />
  );

  expect(screen.queryByText('Error')).toBeNull();
});

test('can validate invalid password length', () => {
  const onChange = jest.fn();
  render(
    <Input
      id='key'
      label='Input'
      value='Paaaaaa'
      validation={{ type: 'minLength', value: 8 }}
      onChange={onChange}
      errorMessage='Error'
      touched={true}
    />
  );

  expect(screen.getByText('Error')).toBeVisible();
});
