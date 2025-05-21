import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForbiddenNameValidator } from '../../validators/forbidden-name.validator';
import { MaxPriceValidator } from '../../validators/max-price.validator';



@Component({
  standalone: true,
  selector: 'app-instrument-form',
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-form.component.scss']
})
export class InstrumentFormComponent {
  @Output() addInstrument = new EventEmitter<any>();

  instrumentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.instrumentForm = this.fb.group({
  name: ['', [
    Validators.required,
    Validators.minLength(2),
    ForbiddenNameValidator.check()  // ← кастомний валідатор
  ]],
  price: [null, [
    Validators.required,
    Validators.min(1),
    MaxPriceValidator.limit(100000)  // ← другий кастомний валідатор
  ]],

      type: ['', Validators.required],

      guitarType: [''],
      strings: [null],

      keys: [null],
      mechanism: [''],

      pieces: [null],
      hasPedal: [false],

      rentPricePerDay: [null, [Validators.min(0)]]
    });

    this.instrumentForm.get('type')?.valueChanges.subscribe(type => {
      this.updateValidators(type);
    });
  }

  updateValidators(type: string) {
  const controls = this.instrumentForm.controls;

  controls['guitarType'].clearValidators();
  controls['strings'].clearValidators();
  controls['keys'].clearValidators();
  controls['mechanism'].clearValidators();
  controls['pieces'].clearValidators();

  switch (type) {
    case 'guitar':
      controls['guitarType'].setValidators([Validators.required]);
      controls['strings'].setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      break;
    case 'piano':
      controls['keys'].setValidators([Validators.required, Validators.min(20), Validators.max(120)]);
      controls['mechanism'].setValidators([Validators.required]);
      break;
    case 'drums':
      controls['pieces'].setValidators([Validators.required, Validators.min(1), Validators.max(20)]);
      break;
  }

  // 🔒 БЕЗ зациклення
  Object.values(controls).forEach(control =>
    control.updateValueAndValidity({ onlySelf: true, emitEvent: false })
  );
}


  onSubmit() {
    if (this.instrumentForm.valid) {
      this.addInstrument.emit(this.instrumentForm.value);
      this.instrumentForm.reset();
    } else {
      this.instrumentForm.markAllAsTouched();
    }
  }

  isType(type: string) {
    return this.instrumentForm.get('type')?.value === type;
  }
}
