// forbidden-name.validator.spec.ts
import { FormControl } from '@angular/forms';
import { ForbiddenNameValidator } from './forbidden-name.validator';

describe('ForbiddenNameValidator', () => {
  it('повертає помилку, якщо імʼя заборонене', () => {
    const control = new FormControl('admin');
    const result = ForbiddenNameValidator.check()(control);
    expect(result).toEqual({ forbiddenName: true });
  });

  it('не повертає помилку, якщо імʼя дозволене', () => {
    const control = new FormControl('guitar');
    const result = ForbiddenNameValidator.check()(control);
    expect(result).toBeNull();
  });
});
