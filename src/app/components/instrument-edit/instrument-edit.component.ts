// instrument-edit.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IInstrument } from '../../models/IInstrument';

@Component({
  standalone: true,
  selector: 'app-instrument-edit',
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './instrument-edit.component.html',
  styleUrls: ['./instrument-edit.component.scss']
})
export class InstrumentEditComponent {
  @Input() instruments: IInstrument[] = [];
  @Output() updateInstrument = new EventEmitter<any>();

  selectedInstrumentIndex: number | null = null;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  selectInstrument(index: number) {
    this.selectedInstrumentIndex = index;
    const instr = this.instruments[index];
    if (!instr) return;

    const type = instr.getType().toLowerCase();

    this.form = this.fb.group({
      name: [instr.getName(), Validators.required],
      price: [instr.getPrice(), [Validators.required, Validators.min(1)]],
      type: [type, Validators.required],
      rentPricePerDay: [(instr as any).rentPricePerDay || null]
    });

    this.updateDynamicFields(type, instr);

    // 👂 Підписка на зміну типу
    this.form.get('type')?.valueChanges.subscribe((newType: string) => {
      this.updateDynamicFields(newType);
    });
  }

  updateDynamicFields(type: string, instr: any = {}) {
    // Очистка старих полів
    ['guitarType', 'strings', 'keys', 'mechanism', 'pieces', 'hasPedal'].forEach(field => {
      if (this.form.contains(field)) {
        this.form.removeControl(field);
      }
    });

    // Додавання нових відповідно до типу
    if (type === 'guitar') {
      this.form.addControl('guitarType', this.fb.control(instr.guitarType || '', Validators.required));
      this.form.addControl('strings', this.fb.control(instr.strings || 6, [Validators.required, Validators.min(1)]));
    }

    if (type === 'piano') {
      this.form.addControl('keys', this.fb.control(instr.keys || 88, [Validators.required]));
      this.form.addControl('mechanism', this.fb.control(instr.mechanism || '', Validators.required));
    }

    if (type === 'drums') {
      this.form.addControl('pieces', this.fb.control(instr.pieces || 5, [Validators.required]));
      this.form.addControl('hasPedal', this.fb.control(instr.hasPedal || false));
    }
  }

  isType(type: string) {
    return this.form.get('type')?.value === type;
  }

  save() {
    if (this.form.valid && this.selectedInstrumentIndex !== null) {
      this.updateInstrument.emit({
        index: this.selectedInstrumentIndex,
        data: this.form.value
      });
      this.form.reset();
      this.selectedInstrumentIndex = null;
    }
  }
}
