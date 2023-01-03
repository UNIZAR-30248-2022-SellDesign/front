import { async, TestBed } from '@angular/core/testing';
import { ModalEditComponent } from './modal-edit.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalEditComponent', () => {
  let component: ModalEditComponent;
  let modalRef: MdbModalRef<ModalEditComponent>;

  beforeEach(async(() => {
    modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, NoopAnimationsModule ],
      declarations: [ ModalEditComponent ],
      providers: [
        { provide: MdbModalRef, useValue: modalRef }
      ]
    }).compileComponents();

    component = TestBed.createComponent(ModalEditComponent).componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the userName property to the value of the userName item in local storage', () => {
    // Set the value of the userName item in local storage
    localStorage.setItem('userName', 'testuser');

    // Call the ngOnInit method
    component.ngOnInit();

    // Verify that the userName property has the correct value
    expect(component.userName).toEqual('testuser');
  });

  it('should call the close method of the modalRef and pass it the data property when the guardarDatos method is called', () => {
    // Set the values of the nombre and descripcion properties
    component.nombre = 'Test Name';
    component.descripcion = 'Test Description';

    // Call the guardarDatos method
    component.guardarDatos();

    // Verify that the close method was called with the correct data
    expect(modalRef.close).toHaveBeenCalledWith([{ nombre: 'Test Name', descripcion: 'Test Description' }]);
  });
});