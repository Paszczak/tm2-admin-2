// onInputChangeHandler is a handler to change form state
export function onInputChangeHandler<
  ControlsType extends { [key: string]: any }
>(
  key: string,
  value: string,
  controls: ControlsType,
  formSet: ({
    controls,
    isFormTouched,
  }: {
    controls: ControlsType;
    isFormTouched?: boolean;
  }) => void,
  checked?: boolean
) {
  const updatedControls = {
    ...controls,
    [key as keyof ControlsType]: {
      ...controls[key as keyof ControlsType],
      value: value,
      touched: true,
      htmlProps: {
        ...controls[key as keyof ControlsType].htmlProps!,
        checked: checked,
      },
    },
  };

  formSet({ controls: updatedControls, isFormTouched: true });
}
