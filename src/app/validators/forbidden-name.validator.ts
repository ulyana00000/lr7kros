import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ForbiddenNameValidator {
  static forbiddenNames = ['admin', 'test', 'root'];

  static check(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.forbiddenNames.includes(control.value?.toLowerCase());
      return forbidden ? { forbiddenName: true } : null;
    };
  }
}
