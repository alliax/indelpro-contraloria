import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaTipoPage } from './busqueda-tipo.page';

describe('BusquedaTipoPage', () => {
  let component: BusquedaTipoPage;
  let fixture: ComponentFixture<BusquedaTipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaTipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaTipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
