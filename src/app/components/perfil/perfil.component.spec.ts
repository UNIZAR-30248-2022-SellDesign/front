import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ComponentFixture } from '@angular/core/testing';
import axios from 'axios';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

describe('PerfilComponent', () => {
    let component: PerfilComponent;
    let fixture: ComponentFixture<PerfilComponent>;
    let modalService: MdbModalService;
    let router: Router;

    beforeEach(async(() => {
        //fixture = TestBed.createComponent(PerfilComponent);
        //component = fixture.componentInstance;

        TestBed.configureTestingModule({
        declarations: [PerfilComponent],
        providers: [
          { provide: Router, useValue: { navigate: () => {} } }
        ]
        }).compileComponents();

        router = TestBed.inject(Router);
        component = new PerfilComponent(modalService, router);
        
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    
    it('should retrieve and set the user\'s real name and description', fakeAsync(() => {
        // Set up mock data for the HTTP request
        const mockResponse = {
          data: {
            realname: 'John Smith',
            description: 'I am a software developer',
            image: ''
          }
        };
        spyOn(axios, 'get').and.returnValue(Promise.resolve(mockResponse));
    
        // Call the getInfo function
        component.getInfo();
        tick(1500)
        // Check if the real name and description were set correctly
        expect(component.nombre).toBe('John Smith');
        expect(component.descripcion).toBe('I am a software developer');
      }));
      
      it('should return false if a product name does not contain "Pantalon"', () => {
        expect(component.contains('Shirt')).toEqual(false);
      });

      it('should call getMore method with seleccion=false and set noHayDisenos and cargarMas', () => {
        // mock the axios.get function to return a resolved promise with a dummy response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [] }));
    
        component.getMore(false);
    
        // the getMore method should set the noHayDisenos to true and cargarMas to false
        expect(component.noHayDisenos).toBeTrue();
        expect(component.cargarMas).toBeFalse();
      });
      it('should call getMore method with seleccion=false and set noHayDisenos and cargarMas with length more than 0', fakeAsync(() => {
        // mock the axios.get function to return a resolved promise with a dummy response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{value:1}] }));
    
        component.getMore(false);
        tick(1000)
        // the getMore method should set the noHayFav to true and cargarMasFav to false
        expect(component.noHayDisenos).toBeFalse();
        expect(component.cargarMas).toBeTrue();
      }));
      it('ngOninit', fakeAsync(() => {
        // mock the axios.get function to return a resolved promise with a dummy response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{value:1}] }));
    
        component.ngOnInit();
        tick(1000)
        // the getMore method should set the noHayFav to true and cargarMasFav to false
        expect(component.noHayDisenos).toBeFalse();
        expect(component.cargarMas).toBeTrue();
        expect(component.noHayFav).toBeFalse();
        expect(component.cargarMasFav).toBeTrue();
      }));
    
      it('should call getMore method with seleccion=true and set noHayFav and cargarMasFav', () => {
        // mock the axios.get function to return a resolved promise with a dummy response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [] }));
    
        component.getMore(true);
    
        // the getMore method should set the noHayFav to true and cargarMasFav to false
        expect(component.noHayFav).toBeTrue();
        expect(component.cargarMasFav).toBeFalse();
      });

      it('should call getMore method with seleccion=true and set noHayFav and cargarMasFav with length more than 0', fakeAsync(() => {
        // mock the axios.get function to return a resolved promise with a dummy response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{value:1}] }));
    
        component.getMore(true);
        tick(1000)
        // the getMore method should set the noHayFav to true and cargarMasFav to false
        expect(component.noHayFav).toBeFalse();
        expect(component.cargarMasFav).toBeTrue();
      }));

      it('should set the image URL when onSelectFile is called with a valid file', fakeAsync(() => {
        spyOn(axios, 'post').and.returnValue(Promise.resolve({response:{status:200,data:{data:{media:'http'}}}}));
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

      it('getMyImageOfDesign', fakeAsync(() => {
        //component.myProducts=[{productId:'',productImage:'', designImage : '',name:'',price:0}]
        spyOn(axios, 'get').and.returnValue(Promise.resolve({data:[{design:{image:'http'}}]}));    
        component.getMyImageOfDesign('productId','_id','name','productImage',10);
        tick(2500)
        // Check that the image URL was set correctly
        expect(component.myProducts[1].designImage).toEqual('http');
      }));
      it('getImageOfDesign', fakeAsync(() => {
        //component.myProducts=[{productId:'',productImage:'', designImage : '',name:'',price:0}]
        spyOn(axios, 'get').and.returnValue(Promise.resolve({data:[{design:{image:'http'}}]}));    
        component.getImageOfDesign('productId','_id','name','productImage',10);
        tick(2500)
        // Check that the image URL was set correctly
        expect(component.products[1].designImage).toEqual('http');
      }));
});