import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SistemasSapPage } from './sistemas-sap.page';

describe('SistemasSapPage', () => {
  let component: SistemasSapPage;
  let fixture: ComponentFixture<SistemasSapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemasSapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SistemasSapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
