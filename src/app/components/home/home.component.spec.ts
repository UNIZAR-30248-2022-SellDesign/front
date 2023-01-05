import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
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

   it('ngOnInit gets home products', fakeAsync(() => {
     // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
     spyOn(axios, 'get').and.resolveTo({ 
       data: [
         { productName: 'ADSFASDF',
           designName: "asdasdasd",
           price: 13,
           image: "sadasd" } 
     ]})
     component.ngOnInit();
     tick(1500)
     expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/home/page/0');

     expect(component.newProducts.length).toEqual(1);
     expect(component.esNovedad).toEqual(true);
     expect(component.noHayProductos).toEqual(false);
     expect(component.hayMas).toEqual(true);
   }));
  
   it('ngOnInit does not get home products', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    spyOn(axios, 'get').and.resolveTo({ data: [] })
    component.ngOnInit();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/home/page/0');

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
  }));

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
  
  it('getMore with flag 1', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: [
        { productName: 'ADSFASDF'} 
    ]})
    component.newProducts = [{productName: 'adfsadf'}]
    component.flagView = true
    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/page/1");

    expect(component.newProducts.length).toEqual(2);
    expect(component.esNovedad).toEqual(true);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));

  
  it('getMore with flag 1 and legnth newProducts 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.newProducts = []
    component.flagView = true
    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/page/1");

    expect(component.newProducts.length).toEqual(0);
    expect(component.esNovedad).toEqual(true);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

  it('getMore with flag 1 and response data length 8', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: [{valor: 1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1},{valor:1}]})
    component.newProducts = []
    component.flagView = true
    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/page/1");

    expect(component.newProducts.length).toEqual(11);
    expect(component.esNovedad).toEqual(true);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(true);
  }));

  it('getMore with flagView false and response data == 0', fakeAsync(() => {
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.newProducts = [{valor:1},{valor:1}]
    component.flagView = false
    component.busqueda='food'
    component.contPageHome = 1

    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/search/food/1");

    expect(component.newProducts.length).toEqual(2);
    // expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));

  it('getMore with flagView false and responsData == 0 and length newProducts == 0', fakeAsync(() => {
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.newProducts = []
    component.flagView = false
    component.busqueda='food'
    component.contPageHome = 1

    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/search/food/1");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

  it('getMore with flagView false and response data != 0', fakeAsync(() => {
    spyOn(axios, 'get').and.resolveTo({ 
      data: [{valor:1},{valor:1}]})
    component.newProducts = []
    component.flagView = false
    component.busqueda='food'
    component.contPageHome = 1

    component.getMore();
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/search/food/1");

    expect(component.newProducts.length).toEqual(2);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(true);
  }));

  it('filterPrice with empty busqueda', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: [{valor: 1}]})
    component.tipo = 'Prenda'
    component.busqueda = ''
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/0/1");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));

  it('filterPrice with empty busqueda and empty response', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.tipo = 'Prenda'
    component.busqueda = ''
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/0/1");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

  it('filterPrice with empty busqueda con tipo Pantalon', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: [{valor: 1}]})
    component.tipo = 'Pantalon'
    component.busqueda = ''
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/0/1/0");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));
  
  it('filterPrice with empty busqueda con tipo Pantalon newProduct length 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.tipo = 'Pantalon'
    component.busqueda = ''
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/0/1/0");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

  it('filterPrice with busqueda food with min 0 and max 1 and empty response', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: []})
    component.tipo = 'Pantalon'
    component.busqueda = 'food'
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/search/food/0/1");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

  it('filterPrice with busqueda food with min 0 and max 1 ', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ 
      data: [{value:1}]})
    component.tipo = 'Pantalon'
    component.busqueda = 'food'
    component.filterPrice(0,1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/search/food/0/1");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));
  
  it('filterPrenda with precio = Precio and responseData != 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    component.esBusqueda = true

    spyOn(axios, 'get').and.resolveTo({ data: [{valor:1}]})
    
    component.filterPrenda(1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));
  
  it('filterPrenda with precio = Precio and responseData == 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    component.esBusqueda = true

    spyOn(axios, 'get').and.resolveTo({ data: []})
    
    component.filterPrenda(1);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));








  it('filterPrenda with precio and responseData != 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ data: [{valor:1}]})
    component._min = 1
    component._max = 30
    component.precio = '20'
    component.filterPrenda(2);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1/30/2");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));
  
  it('filterPrenda with precio and responseData == 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    component._min = 1
    component._max = 30
    component.precio = '20'

    spyOn(axios, 'get').and.resolveTo({ data: []})
    
    component.filterPrenda(2);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1/30/2");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));









  it('filterPrenda with precio and responseData != 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    spyOn(axios, 'get').and.resolveTo({ data: [{valor:1}]})
    component._min = 1
    component._max = 30
    component.precio = '20'
    component.filterPrenda(3);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1/30/3");

    expect(component.newProducts.length).toEqual(1);
    expect(component.noHayProductos).toEqual(false);
    expect(component.hayMas).toEqual(false);
  }));
  
  it('filterPrenda with precio = Precio and responseData == 0', fakeAsync(() => {
    // spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    
    component.esBusqueda = true
    component._min = 1
    component._max = 30
    component.precio = '20'
    spyOn(axios, 'get').and.resolveTo({ data: []})
    
    component.filterPrenda(3);
    tick(1500)
    expect(axios.get).toHaveBeenCalledWith("https://selldesign-backend.onrender.com/products/home/1/30/3");

    expect(component.newProducts.length).toEqual(0);
    expect(component.noHayProductos).toEqual(true);
    expect(component.hayMas).toEqual(false);
  }));

});
