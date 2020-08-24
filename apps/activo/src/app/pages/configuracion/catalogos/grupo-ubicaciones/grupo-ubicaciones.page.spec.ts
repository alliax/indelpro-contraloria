import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoUbicacionesPage } from './grupo-ubicaciones.page';

describe('GrupoUbicacionesPage', () => {
  let component: GrupoUbicacionesPage;
  let fixture: ComponentFixture<GrupoUbicacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoUbicacionesPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoUbicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
