import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleExpedientePage } from './detalle-expediente.page';

describe('DetalleExpedientePage', () => {
  let component: DetalleExpedientePage;
  let fixture: ComponentFixture<DetalleExpedientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleExpedientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleExpedientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
