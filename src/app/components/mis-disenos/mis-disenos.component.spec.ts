import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

import { MisDisenosComponent } from './mis-disenos.component';

describe('MisDisenosComponent', () => {
  let component: MisDisenosComponent;
  let fixture: ComponentFixture<MisDisenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MdbModalService,
      ],
      declarations: [ MisDisenosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDisenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
