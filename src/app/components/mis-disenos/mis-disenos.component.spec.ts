import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MisDisenosComponent } from './mis-disenos.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from '../modal-edit-diseno/modal-edit-diseno.component';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';
import axios from 'axios';
import { Router } from '@angular/router';
describe('MisDisenosComponent', () => {
  let component: MisDisenosComponent;
  let modalService: MdbModalService;
  let modalRef: any;
  let router: Router;

  beforeEach(async(() => {
    
    modalService = jasmine.createSpyObj('MdbModalService', ['open']);
    TestBed.configureTestingModule({
    declarations: [MisDisenosComponent],
    providers: [
      { provide: Router, useValue: { navigate: () => {} } }
    ]
    }).compileComponents();

    router = TestBed.inject(Router);
    component = new MisDisenosComponent(modalService, router);
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

});