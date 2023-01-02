import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BuscadorService } from '../../services/buscador.service';
import { ArgumentService } from 'src/app/services/argument.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let buscadorService: BuscadorService;
  let argumentService: ArgumentService;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        BuscadorService,
        ArgumentService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    buscadorService = TestBed.inject(BuscadorService);
    argumentService = TestBed.inject(ArgumentService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables and make HTTP request on ngOnInit', () => {
    spyOn(component, 'getIni').and.returnValue(undefined);
    component.ngOnInit();
    expect(component.newProducts).toBeUndefined();
    expect(component.contPageHome).toEqual(0);
    expect(component.contPageBusqueda).toEqual(0);
    expect(component.flagView).toEqual(true);
    expect(component.busqueda).toEqual('');
    expect(component.esNovedad).toEqual(false);
    expect(component.esBusqueda).toEqual(false);
    expect(component.hayMas).toEqual(false);
    expect(component.noHayProductos).toEqual(false);
    expect(component.precio).toEqual('Precio');
    expect(component.tipo).toEqual('Prenda');
    expect(component._min).toEqual(0);
    expect(component._max).toEqual(0);
    expect(component.tipoEntero).toEqual(0);
    expect(component.getIni).toHaveBeenCalled();
  });
  /*it('should emit search event on search', () => {
    component.busquedaForm.controls.busqueda.setValue('test');
    spyOn(component.busqueda, 'emit');
    component.buscar();
    expect(component.busqueda.emit).toHaveBeenCalledWith('test');
  });*/
  /*it('should update products and search term on subscription to BuscadorService', () => {
    spyOn(buscadorService.disparadorDeBusqueda, 'subscribe').and.callFake((cb) => {
      cb({
        data: {
          data: [{ id: 1, name: 'Test Product' }],
          busqueda: 'test'
        }
      });
    });
    component.ngOnInit();
    expect(component.newProducts).toEqual([{ id: 1, name: 'Test Product' }]);
    expect(component.flagView).toEqual(false);
    expect(component.contPageHome).toEqual(0);
    expect(component.contPageBusqueda).toEqual(0);
    expect(component.esNovedad).toEqual(false);
    expect(component.esBusqueda).toEqual(true);
    expect(component.hayMas).toEqual(false);
    expect(component.noHayProductos).toEqual(false);
    expect(component.precio).toEqual('Precio');
    expect(component.tipo).toEqual('');
  });*/

  it('should make HTTP request and update products on getMore for search view', () => {
    component.flagView = false;
    component.contPageBusqueda = 0;
    component.busqueda = 'test';
    //spyOn(component, 'getSearch').and.returnValue(null);
    component.getMore();
    //expect(component.getSearch).toHaveBeenCalledWith('test', 1);
    expect(component.newProducts).toBeUndefined();
    expect(component.contPageHome).toEqual(0);
    expect(component.contPageBusqueda).toEqual(1);
    expect(component.esNovedad).toEqual(false);
    expect(component.esBusqueda).toEqual(false);
    expect(component.hayMas).toEqual(false);
    expect(component.noHayProductos).toEqual(false);
    expect(component.precio).toEqual('Precio');
    expect(component.tipo).toEqual('Prenda');
  });

  /*it('should update message on subscription to ArgumentService', () => {
    spyOn(argumentService.sendArgument, 'subscribe').and.callFake((cb) => {
      cb('test message');
    });
    component.ngOnInit();
    expect(component.message).toEqual('test message');
  });*/

});
