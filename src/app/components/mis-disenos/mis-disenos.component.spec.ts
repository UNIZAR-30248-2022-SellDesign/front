import { TestBed, async } from '@angular/core/testing';
import { MisDisenosComponent } from './mis-disenos.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from '../modal-edit-diseno/modal-edit-diseno.component';
import { of } from 'rxjs';

describe('MisDisenosComponent', () => {
  let component: MisDisenosComponent;
  let modalService: MdbModalService;

  beforeEach(async(() => {
    modalService = jasmine.createSpyObj('MdbModalService', ['open']);
    component = new MisDisenosComponent(modalService);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal when openModal is called', () => {
    const modalRef = jasmine.createSpyObj('MdbModalRef', ['onClose']);
    //modalService.open.and.returnValue(modalRef);
    modalRef.onClose.and.returnValue(of({}))
    component.openModal(0, { _id: '1', name: 'test', image: 'image' });
    expect(modalService.open).toHaveBeenCalledWith(ModalEditDisenoComponent, {
      data: {
        nombreDiseno: 'test',
        imagen: 'image',
        esEditar: true,
        idDiseno: '1',
      },
    });
  });

  /*it('should update the designs list when the modal is closed with a flag of 1', () => {
    const modalRef = jasmine.createSpyObj('MdbModalRef', ['onClose']);
    //modalService.open.and.returnValue(modalRef);
    component.newDesigns = [{ _id: '1', name: 'test', image: 'image' }];
    modalRef.onClose.and.returnValue(of([{ _id: '1', name: 'test', image: 'image', flag: 1 }]));
    component.openModal(0, { _id: '1', name: 'test', image: 'image' });
    expect(component.newDesigns).toEqual([{ _id: '1', name: 'test', image: 'image' }]);
  });*/
});