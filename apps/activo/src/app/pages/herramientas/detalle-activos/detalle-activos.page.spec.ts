import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleActivosPage } from './detalle-activos.page';

describe('DetalleActivosPage', () => {
  let component: DetalleActivosPage;
  let fixture: ComponentFixture<DetalleActivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleActivosPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleActivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
