import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpedienteListaElementoComponent } from './expediente-lista-elemento.component';

describe('ExpedienteListaElementoComponent', () => {
  let component: ExpedienteListaElementoComponent;
  let fixture: ComponentFixture<ExpedienteListaElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteListaElementoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpedienteListaElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
