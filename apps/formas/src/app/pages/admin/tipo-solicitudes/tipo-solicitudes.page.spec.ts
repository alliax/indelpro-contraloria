import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoSolicitudesPage } from './tipo-solicitudes.page';

describe('TipoSolicitudesPage', () => {
  let component: TipoSolicitudesPage;
  let fixture: ComponentFixture<TipoSolicitudesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSolicitudesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoSolicitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
