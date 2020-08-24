import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaUbicacionPage } from './busqueda-ubicacion.page';

describe('BusquedaUbicacionPage', () => {
  let component: BusquedaUbicacionPage;
  let fixture: ComponentFixture<BusquedaUbicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaUbicacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaUbicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
