import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MaxPriceValidator {
  static limit(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value !== null && value > max ? { maxPrice: { max, actual: value } } : null;
    };
  }
}
