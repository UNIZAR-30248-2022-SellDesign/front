import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BuscadorService } from '../../services/buscador.service';
import { ArgumentService } from 'src/app/services/argument.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

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

  // it('ngOnInit gets home products', () => {
  //   // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
  //   spyOn(axios, 'get').and.resolveTo({ 
  //     response: {
  //       data: [
  //       { productName: 'ADSFASDF',
  //         designName: "asdasdasd",
  //         price: 13,
  //         image: "sadasd" } 
  //   ]}})
  //   component.ngOnInit();
  //   expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/home/page/0');
    
  //   expect(component.newProducts.length).toEqual(1);
  //   expect(component.esNovedad).toEqual(true);
  //   expect(component.noHayProductos).toEqual(false);
  //   expect(component.hayMas).toEqual(true);
  // });
  
  
  
  
  
    
  it('should make HTTP request and update products on getMore for search view', () => {
    component.flagView = false;
    component.contPageBusqueda = 0;
    component.busqueda = 'test';
    //spyOn(component, 'getSearch').and.returnValue(null);
    component.getMore();
    //expect(component.getSearch).toHaveBeenCalledWith('test', 1);
    expect(component.newProducts.length).toEqual(0);
    expect(component.contPageHome).toEqual(0);
    expect(component.contPageBusqueda).toEqual(1);
    expect(component.esNovedad).toEqual(false);
    expect(component.esBusqueda).toEqual(false);
    expect(component.hayMas).toEqual(false);
    expect(component.noHayProductos).toEqual(false);
    expect(component.precio).toEqual('Precio');
    expect(component.tipo).toEqual('Prenda');
  });
});
