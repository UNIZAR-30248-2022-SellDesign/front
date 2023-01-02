import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

import { MisProductosComponent } from './mis-productos.component';

describe('MisProductosComponent', () => {
  let component: MisProductosComponent;
  let fixture: ComponentFixture<MisProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MdbModalService,
      ],
      declarations: [ MisProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
