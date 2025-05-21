import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HomePage,                    // 👈 standalone component
        IonicModule.forRoot(),       // 👈 для ion-елементів
        RouterTestingModule,         // 👈 для routerLink або router-outlet
        HttpClientTestingModule      // ✅ ВАЖЛИВО! Для сервісів з HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
