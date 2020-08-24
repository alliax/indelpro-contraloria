import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacionExpedientesPage } from './informacion-expedientes.page';

describe('InformacionExpedientesPage', () => {
  let component: InformacionExpedientesPage;
  let fixture: ComponentFixture<InformacionExpedientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionExpedientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionExpedientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
