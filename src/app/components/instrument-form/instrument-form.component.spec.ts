import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentFormComponent } from './instrument-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('InstrumentFormComponent', () => {
  let component: InstrumentFormComponent;
  let fixture: ComponentFixture<InstrumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentFormComponent, ReactiveFormsModule, FormsModule, IonicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('створює компонент', () => {
    expect(component).toBeTruthy();
  });

  it('форма є невалідною якщо обов’язкові поля порожні', () => {
    component.instrumentForm.setValue({
      name: '',
      price: null,
      type: '',
      guitarType: '',
      strings: null,
      keys: null,
      mechanism: '',
      pieces: null,
      hasPedal: false,
      rentPricePerDay: null
    });
    expect(component.instrumentForm.valid).toBeFalse();
  });

  it('повертає валідність форми при правильних значеннях для гітари', () => {
    component.instrumentForm.get('type')?.setValue('guitar');
    component.updateValidators('guitar');

    component.instrumentForm.patchValue({
      name: 'Yamaha F310',
      price: 5000,
      guitarType: 'Акустична',
      strings: 6,
      rentPricePerDay: 100
    });

    expect(component.instrumentForm.valid).toBeTrue();
  });

  it('повертає валідність форми при правильних значеннях для піаніно', () => {
    component.instrumentForm.get('type')?.setValue('piano');
    component.updateValidators('piano');

    component.instrumentForm.patchValue({
      name: 'Casio PX-160',
      price: 7000,
      keys: 88,
      mechanism: 'молоткова',
      rentPricePerDay: 150
    });

    expect(component.instrumentForm.valid).toBeTrue();
  });

  it('повертає валідність форми при правильних значеннях для барабанів', () => {
    component.instrumentForm.get('type')?.setValue('drums');
    component.updateValidators('drums');

    component.instrumentForm.patchValue({
      name: 'Tama Imperialstar',
      price: 12000,
      pieces: 5,
      hasPedal: true,
      rentPricePerDay: 200
    });

    expect(component.instrumentForm.valid).toBeTrue();
  });


  it('не робить emit при submit якщо форма невалідна', () => {
    spyOn(component.addInstrument, 'emit');
    component.instrumentForm.get('name')?.setValue('');
    component.onSubmit();
    expect(component.addInstrument.emit).not.toHaveBeenCalled();
  });
});
