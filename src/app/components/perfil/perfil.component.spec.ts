import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ComponentFixture } from '@angular/core/testing';
import axios from 'axios';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

describe('PerfilComponent', () => {
    let component: PerfilComponent;
    let fixture: ComponentFixture<PerfilComponent>;
    let modalService: MdbModalService;

    beforeEach(async(() => {
        //fixture = TestBed.createComponent(PerfilComponent);
        //component = fixture.componentInstance;
        component = new PerfilComponent(modalService);
        
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
});