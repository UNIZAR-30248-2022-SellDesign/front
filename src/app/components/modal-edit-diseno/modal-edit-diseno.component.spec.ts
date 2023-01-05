import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ModalEditDisenoComponent } from './modal-edit-diseno.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { of } from 'rxjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import axios from 'axios';

describe('ModalEditDisenoComponent', () => {
    let component: ModalEditDisenoComponent;
    let modalRef: MdbModalRef<ModalEditDisenoComponent>;
    modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);
    beforeEach(async(() => {
        //modalService = jasmine.createSpyObj('MdbModalService', ['open']);
        component = new ModalEditDisenoComponent(modalRef);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set the idUser property to the value of the idUsuario item in local storage', () => {
        // Set the value of the idUsuario item in local storage
        localStorage.setItem('idUsuario', '12345');
    
        // Call the ngOnInit method
        component.ngOnInit();
    
        // Verify that the idUser property has the correct value
        expect(component.idUser).toEqual('12345');
      });

    it('should call the guardarDatos method and close the modal with a flag of 0 when the save button is clicked', fakeAsync(() => {
        component.nombreDiseno = 'Test Design';
        component.imagen = 'jop';
        spyOn(axios, 'post').and.returnValue(Promise.resolve({ status: 200 }));
        component.guardarDatos('jop', 'Test Design');
        tick(1500)
        expect(modalRef.close).toHaveBeenCalledWith([{
            flag: 0,
            name: 'Test Design',
            image: 'jop',
            _id: ''
            }]);
        expect(component.error).toEqual(false)
    }));
    it('should call the guardarDatos method and have error', () => {
        component.nombreDiseno = 'Test Design';
        component.imagen = 'jop';
        spyOn(axios, 'post').and.returnValue(Promise.resolve({ status: 200 }));
        component.guardarDatos('jop', '');
        expect(component.error).toEqual(true)
    });
        
    it('should call the actualizarDatos method and close the modal with a flag of 1 when the update button is clicked', fakeAsync(() => {
        component.nombreDiseno = 'Test Design';
        component.imagen = 'http://testimage.com';
        component.idDiseno = '123';
        spyOn(axios, 'put').and.returnValue(Promise.resolve({ status: 201 }));

        component.actualizarDatos('http://testimage.com', 'Test Design', '123');
        tick(1500)
        expect(modalRef.close).toHaveBeenCalledWith([{
        flag: 1,
        name: 'Test Design',
        image: 'http://testimage.com',
        _id: '123'
        }]);
    }));
    it('should call the eliminarDatos method  with error and close the modal with a flag of 2 when the delete button is clicked', () => {
        const modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);
        component.modalRef = modalRef;
        component.idDiseno = '123';
        component.eliminarDatos('123');
        expect(modalRef.close).toHaveBeenCalledWith([{
        flag: 2,
        _id: '123'
        }]);
    });
    it('should call the eliminarDatos method and close the modal with a flag of 2 when the delete button is clicked', () => {
        const modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);
        component.modalRef = modalRef;
        component.idDiseno = '123';
        spyOn(axios, 'delete').and.returnValue(Promise.resolve());
        component.eliminarDatos('123');
        expect(modalRef.close).toHaveBeenCalledWith([{
        flag: 2,
        _id: '123'
        }]);
    });

    it('should set the image URL when onSelectFile is called with a valid file', () => {
        spyOn(axios, 'post').and.returnValue(Promise.resolve({response:{status:200,data:{data:{media:'http'}}}}));
        // Create a fake file object
        const file = new File(['image data'], 'image.jpg', { type: 'image/jpeg' });
        // Create a fake event object
        const event = { target: { files: [file] } };
        // Spy on the axios post method
        
    
        component.onSelectFile(event);
        // Check that the image URL was set correctly
        expect(component.hayErrorFoto).toEqual(false);
      })    ;
    
      it('should set the error flag when onSelectFile is called with a invalid file', fakeAsync(() => {
        // Create a fake event object with no files
        const event = { target: { files: [] } };
        spyOn(axios, 'post').and.resolveTo({status: 201})
        //tick(1500)
        component.onSelectFile(event);
        tick(1500)
        // Check that the error flag was set
        expect(component.hayErrorFoto).toEqual(false);
      }));


});
