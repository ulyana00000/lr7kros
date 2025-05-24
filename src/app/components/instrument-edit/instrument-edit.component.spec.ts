import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentEditComponent } from './instrument-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IInstrument } from '../../models/IInstrument';
import { By } from '@angular/platform-browser';

describe('InstrumentEditComponent', () => {
  let component: InstrumentEditComponent;
  let fixture: ComponentFixture<InstrumentEditComponent>;

  const mockInstruments: IInstrument[] = [
    {
      getName: () => 'Fender',
      getType: () => 'guitar',
      getPrice: () => 10000,
      guitarType: 'electric',
      strings: 6,
      rentPricePerDay: 200
    } as any,
    {
      getName: () => 'Yamaha',
      getType: () => 'piano',
      getPrice: () => 20000,
      keys: 88,
      mechanism: 'механіка',
      rentPricePerDay: 300
    } as any,
    {
      getName: () => 'Tama',
      getType: () => 'drums',
      getPrice: () => 18000,
      pieces: 5,
      hasPedal: true,
      rentPricePerDay: 400
    } as any
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentEditComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentEditComponent);
    component = fixture.componentInstance;
    component.instruments = mockInstruments;
    fixture.detectChanges();
  });

  it('має ініціалізувати форму для гітари', () => {
    component.selectInstrument(0);
    expect(component.form.contains('guitarType')).toBeTrue();
    expect(component.form.contains('strings')).toBeTrue();
  });

  it('має ініціалізувати форму для піаніно', () => {
    component.selectInstrument(1);
    expect(component.form.contains('keys')).toBeTrue();
    expect(component.form.contains('mechanism')).toBeTrue();
  });

  it('має ініціалізувати форму для барабанів', () => {
    component.selectInstrument(2);
    expect(component.form.contains('pieces')).toBeTrue();
    expect(component.form.contains('hasPedal')).toBeTrue();
  });

  it('має емітити оновлений інструмент при збереженні', () => {
    spyOn(component.updateInstrument, 'emit');

    component.selectInstrument(0);
    component.form.patchValue({ name: 'New name' });

    component.save();

    expect(component.updateInstrument.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        index: 0,
        data: jasmine.objectContaining({ name: 'New name' })
      })
    );
  });

  it('не дозволяє зберегти форму без назви', () => {
    component.selectInstrument(0);
    component.form.get('name')?.setValue('');
    expect(component.form.valid).toBeFalse();
  });

  it('видаляє старі динамічні поля при зміні типу', () => {
    component.selectInstrument(0); // guitar
    expect(component.form.contains('guitarType')).toBeTrue();

    // Імітація вибору нового типу — piano
    component.form.get('type')?.setValue('piano');

    expect(component.form.contains('guitarType')).toBeFalse(); // 🔥 Має видалитись
    expect(component.form.contains('keys')).toBeTrue();        // 🔥 Має додатись
  });

  it('не додає зайві поля при невідомому типі', () => {
    component.selectInstrument(0);
    component.updateDynamicFields('violin'); // тип, якого нема

    expect(component.form.contains('guitarType')).toBeFalse();
    expect(component.form.contains('keys')).toBeFalse();
    expect(component.form.contains('pieces')).toBeFalse();
  });






});
