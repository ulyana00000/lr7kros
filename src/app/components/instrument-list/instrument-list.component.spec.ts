import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentListComponent } from './instrument-list.component';
import { InstrumentService } from '../../services/instrument.service';
import { of } from 'rxjs';
import { IInstrument } from '../../models/IInstrument';
import { InstrumentFactory } from '../../factory/InstrumentFactory';

describe('InstrumentListComponent', () => {
  let component: InstrumentListComponent;
  let fixture: ComponentFixture<InstrumentListComponent>;
  let serviceSpy: jasmine.SpyObj<InstrumentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('InstrumentService', ['getInstruments', 'saveInstruments']);

    await TestBed.configureTestingModule({
      imports: [InstrumentListComponent],
      providers: [{ provide: InstrumentService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentListComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(InstrumentService) as jasmine.SpyObj<InstrumentService>;
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('повинен ініціалізувати інструменти з сервісу', () => {
    const mockInstruments: IInstrument[] = [
      InstrumentFactory.create({ name: 'Test', price: 1000, type: 'guitar', guitarType: 'acoustic', strings: 6 })
    ];
    serviceSpy.getInstruments.and.returnValue(of(mockInstruments));

    component.ngOnInit();

    expect(component.instruments.length).toBe(1);
    expect(component.instruments[0].getName()).toBe('Test');
  });

  it('повинен додати новий інструмент та зберегти його', () => {
    const data = {
      name: 'New Instrument',
      price: 2000,
      type: 'guitar',
      guitarType: 'acoustic',
      strings: 6
    };

    serviceSpy.saveInstruments.and.returnValue(of([]));

    component.addInstrumentToList(data);

    expect(component.instruments.length).toBe(1);
    expect(component.instruments[0].getName()).toBe('New Instrument');
    expect(serviceSpy.saveInstruments).toHaveBeenCalled();
  });

  it('повинен оновити інструмент у списку', () => {
    const existing = InstrumentFactory.create({ name: 'Old', price: 1000, type: 'guitar', guitarType: 'acoustic', strings: 6 });
    component.instruments = [existing];

    const updatedData = {
      name: 'Updated',
      price: 3000,
      type: 'guitar',
      guitarType: 'electro',
      strings: 6
    };

    serviceSpy.saveInstruments.and.returnValue(of([]));

    component.onInstrumentUpdated({ index: 0, data: updatedData });

    expect(component.instruments[0].getName()).toBe('Updated');
    expect(serviceSpy.saveInstruments).toHaveBeenCalled();
  });

  it('повинен показати повідомлення про купівлю', () => {
    const instr = InstrumentFactory.create({ name: 'BuyTest', price: 5000, type: 'guitar', guitarType: 'classic', strings: 6 });
    component.buy(instr);
    expect(component.toastOpen).toBeTrue();
    expect(component.toastMessage).toContain('BuyTest');
  });

  it('повинен показати повідомлення про оренду для орендованого інструмента', () => {
    const instr: any = {
      getName: () => 'RentTest',
      rent: (days: number) => days * 100,
      getType: () => 'Гітара',
      getPrice: () => 2000
    };

    component.rent(instr);
    expect(component.toastOpen).toBeTrue();
    expect(component.toastMessage).toContain('RentTest');
  });

  it('повинен правильно визначити чи інструмент орендований', () => {
    const rentable: any = { rent: () => 100 };
    const nonRentable: any = { play: () => {} };

    expect(component.isRentable(rentable)).toBeTrue();
    expect(component.isRentable(nonRentable)).toBeFalse();
  });
});
