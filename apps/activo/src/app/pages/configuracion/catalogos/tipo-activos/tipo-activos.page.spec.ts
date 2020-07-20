import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoActivosPage } from './tipo-activos.page';

describe('TipoActivosPage', () => {
  let component: TipoActivosPage;
  let fixture: ComponentFixture<TipoActivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoActivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoActivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
