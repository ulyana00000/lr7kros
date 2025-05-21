import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MaxPriceValidator {
  static limit(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) return null;
      return control.value > max ? { maxPrice: { max } } : null;
    };
  }
}
