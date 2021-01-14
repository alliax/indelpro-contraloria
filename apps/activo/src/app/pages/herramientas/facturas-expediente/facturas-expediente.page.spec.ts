import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacturasExpedientePage } from './facturas-expediente.page';

describe('FacturasExpedientePage', () => {
  let component: FacturasExpedientePage;
  let fixture: ComponentFixture<FacturasExpedientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasExpedientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacturasExpedientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
