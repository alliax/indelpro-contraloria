import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SapAplicacionPage } from './sap-aplicacion.page';

describe('SapAplicacionPage', () => {
  let component: SapAplicacionPage;
  let fixture: ComponentFixture<SapAplicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapAplicacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SapAplicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
