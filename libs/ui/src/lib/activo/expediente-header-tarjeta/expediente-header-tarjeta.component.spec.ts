import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpedienteHeaderTarjetaComponent } from './expediente-header-tarjeta.component';

describe('ExpedienteHeaderTarjetaComponent', () => {
  let component: ExpedienteHeaderTarjetaComponent;
  let fixture: ComponentFixture<ExpedienteHeaderTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteHeaderTarjetaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpedienteHeaderTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
