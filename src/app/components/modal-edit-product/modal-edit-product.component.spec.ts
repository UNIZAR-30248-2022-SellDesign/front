import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ModalEditProductComponent } from './modal-edit-product.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { of } from 'rxjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import axios, { AxiosPromise } from 'axios';
import { backURI } from 'src/environments/backURI';

describe('ModalEditProductComponent', () => {
    let component: ModalEditProductComponent;
    let modalRef: MdbModalRef<ModalEditProductComponent>;
    modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);
    beforeEach(async(() => {
        //modalService = jasmine.createSpyObj('MdbModalService', ['open']);
        component = new ModalEditProductComponent(modalRef);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit when the component is initialized', fakeAsync(() => {
        spyOn(axios, 'get').and.resolveTo({data: []})
        component.idUser = '3'
        component.esEditar = true
        component.diseno.image = 'image'
        component.diseno.name = 'name'
        component.ngOnInit();
        tick(1500)
        expect(component.imagenDiseno).toBe('image');
        expect(component.designName).toBe('name');
    }));
    it('should call ngOnInit when the component is initialized with no edit', fakeAsync(() => {
        spyOn(axios, 'get').and.resolveTo({data: []})
        component.idUser = '3'
        component.esEditar = false
        component.diseno.image = 'image'
        component.ngOnInit();
        tick(1500)
        expect(component.imagenDiseno).toBe('image');
    }));

    it('should make an HTTP GET request to the correct endpoint', fakeAsync(() => {
        spyOn(axios, 'get').and.resolveTo({ 
            data: [
              { productName: 'ADSFASDF',
                designName: "asdasdasd",
                price: 13,
                image: "sadasd" } 
          ]})
        component.getDesigns();
        tick(1500)
        expect(axios.get).toHaveBeenCalledWith(backURI + "designs/" + component.idUser + "/0");
    }));
    it('should set the correct tipo and nombreTipo values', () => {
        component.asignarTipo(1);
        expect(component.tipo).toBe(1);
        expect(component.nombreTipo).toBe('Camiseta');
      
        component.asignarTipo(2);
        expect(component.tipo).toBe(2);
        expect(component.nombreTipo).toBe('Pantalón');
      
        component.asignarTipo(3);
        expect(component.tipo).toBe(3);
        expect(component.nombreTipo).toBe('Sudadera');
      });

      it('guardarDatos with error', fakeAsync(() => {
        component.guardarDatos(0,'Prenda'); 
        tick(1500)
        expect(component.error).toBe(true);
      }));
      it('guardarDatos with errorPrice', fakeAsync(() => {
        component.guardarDatos(101,'descripcion'); 
        tick(1500)
        expect(component.errorPrice).toBe(true);
      }));
      it('guardarDatos with errorPrice', fakeAsync(() => {
        spyOn(axios,'post').and.returnValue(Promise.resolve({}))
        component.guardarDatos(10,'descripcion'); 
        tick(1500)
        expect(component.errorPrice).toBe(false);
      }));
      it('actualizarDatos with errorPrice lower', fakeAsync(() => {
        spyOn(axios,'put').and.returnValue(Promise.resolve({}))
        component.actualizarDatos('foto','nombre','id',4,'descripcion'); 
        tick(1500)
        expect(component.errorPrice).toBe(true);
      }));
      it('actualizarDatos with errorPrice higher', fakeAsync(() => {
        spyOn(axios,'put').and.returnValue(Promise.resolve({}))
        component.actualizarDatos('foto','nombre','id',101,'descripcion'); 
        tick(1500)
        expect(component.errorPrice).toBe(true);
      }));
      it('actualizarDatos with errorPrice higher', fakeAsync(() => {
        spyOn(axios,'put').and.returnValue(Promise.resolve({}))
        component.actualizarDatos('foto','nombre','id',50,'descripcion'); 
        tick(1500)
        expect(component.errorPrice).toBe(false);
      }));
      it('should assign design name and id', () => {
        const designId = '123';
        const designName = 'My Design';
        component.asignDesign(designId, designName);
        expect(component.designName).toEqual(designName);
        expect(component.idDesign).toEqual(designId);
      });

      it('should delete a product', () => {
        component.idUser = '123'
        spyOn(axios,'delete').and.returnValue(Promise.resolve({}))
        component.eliminarDatos('product')
        expect(axios.delete).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/delete/123/product');
    });
    it('should delete a product', () => {
        component.idUser = '123'
        spyOn(axios,'delete').and.returnValue(Promise.resolve({}))
        component.eliminarDatos('product')
        expect(axios.delete).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/delete/123/product');
    });
    it('should set the image URL when onSelectFile is called with a valid file', fakeAsync(() => {
        spyOn(axios, 'post').and.returnValue(Promise.resolve({status:200}));
        // Create a fake file object
        const file = new File(['image data'], 'image.jpg', { type: 'image/jpeg' });
        // Create a fake event object
        const event = { target: { files: [file] } };
        // Spy on the axios post method
        
    
        component.onSelectFile(event);
        tick(1500)
        // Check that the image URL was set correctly
        expect(component.hayErrorFoto).toEqual(false);
      }));
    /*it('should set the error flag when onSelectFile is called with a invalid file', fakeAsync(() => {
        // Create a fake event object with no files
        const event = { target: { files: [] } };
        spyOn(axios, 'post').and.resolveTo({status: 201})
        //tick(1500)
        component.onSelectFile(event);
        tick(1500)
        // Check that the error flag was set
        expect(component.hayErrorFoto).toEqual(false);
      }));*/
     
});
