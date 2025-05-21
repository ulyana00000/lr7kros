import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { InstrumentListComponent } from './instrument-list.component';
import { InstrumentService } from '../../services/instrument.service';

describe('InstrumentListComponent', () => {
  let component: InstrumentListComponent;
  let fixture: ComponentFixture<InstrumentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        InstrumentListComponent,   // 👈 Standalone component
        IonicModule.forRoot(),     // 👈 For all <ion-*> stuff
        HttpClientTestingModule    // 👈 For mock HTTP in InstrumentService
      ],
      providers: [InstrumentService] // 👈 If it's used directly or injected
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recognize rentable instrument', () => {
    const rentableMock = { rent: () => {}, rentPricePerDay: 100 };
    expect(component.isRentable(rentableMock)).toBeTrue();
  });

  it('should NOT recognize non-rentable instrument', () => {
    const regularMock = { noRent: true };
    expect(component.isRentable(regularMock)).toBeFalse();
  });

  it('should generate toast on buy()', () => {
    const mockInstrument: any = {
      getName: () => 'Test Guitar',
      getPrice: () => 9999
    };
    component.buy(mockInstrument);
    expect(component.toastMessage).toContain('Test Guitar');
    expect(component.toastOpen).toBeTrue();
  });

  it('should generate toast on rent()', () => {
    const mockInstrument: any = {
      getName: () => 'Rentable Piano',
      rentPricePerDay: 150,
      rent: (d: number) => d * 150
    };
    component.rent(mockInstrument);
    expect(component.toastMessage).toContain('Rentable Piano');
    expect(component.toastOpen).toBeTrue();
  });
});
