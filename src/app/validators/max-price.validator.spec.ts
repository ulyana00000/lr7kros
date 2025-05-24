// max-price.validator.spec.ts
import { FormControl } from '@angular/forms';
import { MaxPriceValidator } from './max-price.validator';
import { AbstractControl } from '@angular/forms';

describe('MaxPriceValidator', () => {
  it('повертає помилку, якщо ціна більша за ліміт', () => {
  const validator = MaxPriceValidator.limit(10000);
  const control = { value: 15000 } as AbstractControl;

  expect(validator(control)).toEqual({
    maxPrice: { max: 10000, actual: 15000 }
  });
});

  it('не повертає помилку, якщо ціна в межах норми', () => {
    const control = new FormControl(50000);
    const result = MaxPriceValidator.limit(100000)(control);
    expect(result).toBeNull();
  });

  it('не повертає помилку, якщо значення null', () => {
    const control = new FormControl(null);
    const result = MaxPriceValidator.limit(100000)(control);
    expect(result).toBeNull();
  });
});
