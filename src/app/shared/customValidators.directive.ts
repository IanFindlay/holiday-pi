import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function noNonIntegers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return Number.isInteger(control.value)
      ? null
      : { notAnInt: { value: control.value } };
  };
}
