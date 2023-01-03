import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MisDisenosComponent } from './mis-disenos.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from '../modal-edit-diseno/modal-edit-diseno.component';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';

describe('MisDisenosComponent', () => {
  let component: MisDisenosComponent;
  let modalService: MdbModalService;
  let modalRef: any;

  beforeEach(async(() => {
    
    modalService = jasmine.createSpyObj('MdbModalService', ['open']);
    TestBed.configureTestingModule({
    declarations: [MisDisenosComponent]
    }).compileComponents();

    component = new MisDisenosComponent(modalService);
  }));
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    
    /*it('should open the modal when openModal is called', () => {
        modalRef = jasmine.createSpyObj('MdbModalRef', ['onClose']);
        spyOn(modalService, 'open').and.returnValue(modalRef)
        const product: Product = { productName: 'test', image: 'image',designName: 'designTest',price: 10};
        component.openModal(0, product);
        /*expect(modalService.open).toHaveBeenCalledWith(ModalEditDisenoComponent, {
        data: {
        nombreDiseno: 'test',
        imagen: 'image',
        esEditar: true,
        idDiseno: '1',
        },
        });
        expect(modalService.open).toHaveBenCalled();
    });
    /*
    it('should update the designs list when the modal is closed with a flag of 1', () => {
        const product: Product = { productName: 'test', image: 'image',designName: 'designTest',price: 10 };
        component.newDesigns = [product];
        modalRef.onClose.and.returnValue(of([{ ...product, flag: 1 }]));
        component.openModal(0, product);
        expect(component.newDesigns).toEqual([product]);
    });
    
    it('should concatenate the designs list when the modal is closed with a flag of 0', () => {
        const product: Product = { productName: 'test', image: 'image', designName: 'designTest',price: 10 };
        component.newDesigns = [product];
        modalRef.onClose.and.returnValue(of([{ ...product, flag: 0 }]))
    });*/

});