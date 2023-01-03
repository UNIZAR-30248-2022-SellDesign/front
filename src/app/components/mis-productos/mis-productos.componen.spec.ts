import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MisProductosComponent } from './mis-productos.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from '../modal-edit-diseno/modal-edit-diseno.component';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';
import axios from 'axios';
describe('MisProductosComponent', () => {
  let component: MisProductosComponent;
  let modalService: MdbModalService;
  let modalRef: any;

  beforeEach(async(() => {
    
    modalService = jasmine.createSpyObj('MdbModalService', ['open']);
    TestBed.configureTestingModule({
        declarations: [MisProductosComponent]
    }).compileComponents();

    component = new MisProductosComponent(modalService);
  }));
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    it('should set the hayDesignBoton property to false and the hayDesign property to false if the getMore method is called and the response data is empty', () => {
        // Set the return value for the axios.get call in the getMore method
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [] }));
    
        // Call the getMore method
        component.getMore();
    
        // Wait for the axios.get call to complete
        //TestBed.get(HttpClientTestingModule).expectOne('backURI + "designs/" + this.idUser + "/" + this.contPagemisDisenos').flush({ data: [] });
        expect(component.hayDesignBoton).toBe(false);
        expect(component.hayDesign).toBe(false);
    });
    it('should set the hayDesignBoton property to false and the hayDesign property to true if the getMore method is called and the response data is empty', fakeAsync(() => {
        // Set the return value for the axios.get call in the getMore method
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [{value:1}] }));
    
        // Call the getMore method
        component.ngOnInit();
        tick(1500)
        // Wait for the axios.get call to complete
        //TestBed.get(HttpClientTestingModule).expectOne('backURI + "designs/" + this.idUser + "/" + this.contPagemisDisenos').flush({ data: [] });
        expect(component.hayDesignBoton).toBe(true);
        expect(component.hayDesign).toBe(true);
    }));

    it('contains works', () => {
        expect(component.contains('Pantalon')).toEqual(true)
    });
    
    /*it('try to openModal', fakeAsync(() => {
        // Set the return value for the axios.get call in the getMore method
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [{value:1}] }));
    
        // Call the getMore method
        component.openModal(0,1);
        tick(1500)
        // Wait for the axios.get call to complete
        //TestBed.get(HttpClientTestingModule).expectOne('backURI + "designs/" + this.idUser + "/" + this.contPagemisDisenos').flush({ data: [] });
        expect(component.hayDesignBoton).toBe(true);
        expect(component.hayDesign).toBe(true);
    }));   
    /*it('should open modal with upload data when flag is 1', () => {
        component.openModal(1, null);
        expect(modalService.open).toHaveBeenCalledWith(jasmine.any(Function), {
          modalClass: 'modal-lg',
          data: {
            nombreProducto: "",
            imagen: "",
            esSubir: true,
            idProducto: '',
            tipo: component.tipo,
            precio: 0,
            descripcion: '',
            nombreTipo: 'Prenda',
          }
        });
      });*/
});