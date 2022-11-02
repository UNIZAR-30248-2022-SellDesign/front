import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditDisenoComponent } from './modal-edit-diseno.component';

describe('ModalEditDisenoComponent', () => {
  let component: ModalEditDisenoComponent;
  let fixture: ComponentFixture<ModalEditDisenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditDisenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
