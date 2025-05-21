import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ForbiddenNameValidator {
  static forbiddenWords = ['тест', 'aaa', 'lol'];

  static check(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const value = control.value.toLowerCase();
      const isForbidden = this.forbiddenWords.some(word => value.includes(word));
      return isForbidden ? { forbiddenName: true } : null;
    };
  }
}
