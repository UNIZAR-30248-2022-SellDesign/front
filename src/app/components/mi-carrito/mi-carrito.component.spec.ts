import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import { MiCarritoComponent } from './mi-carrito.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../payment/payment.component';
import axios from 'axios';

describe('MiCarritoComponent', () => {
  let component: MiCarritoComponent;
  let modalService: MdbModalService;
  let fixture: ComponentFixture<MiCarritoComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiCarritoComponent, ModalComponent],
      providers: [
        { provide: MdbModalService, useValue: { open: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiCarritoComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(MdbModalService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart items on ngOnInit if idUser exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('123');
    spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }));
    component.ngOnInit();
    expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/cart/123/0');
    expect(component.noHayProductos).toEqual(false);
    expect(component.newProducts).toEqual(undefined);
  });

  /*it('should set noHayProductos to true if cart is empty', async () => {
    spyOn(axios, 'get').and.returnValue(Promise.resolve({response:{ data: [] }}));
    component.getCart();
    expect(component.noHayProductos).toEqual(true);
  });

  it('should get product info for each item in the cart', async () => {
    spyOn(axios, 'get').and.returnValues(
      Promise.resolve({ data: [{ product: 'abc' }, { product: 'def' }] }),
      Promise.resolve({ data: { _id: 'abc', name: 'Product 1', price: 10 } }),
      Promise.resolve({ data: { _id: 'def', name: 'Product 2', price: 20 } })
    );
    component.getCart();
    expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/get/abc');
    expect(axios.get).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/products/get/def');
    expect(component.newProducts).toEqual([
      { _id: 'abc', name: 'Product 1', price: 10 },
      { _id: 'def', name: 'Product 2', price: 20 }
    ]);
  });*/
 /* it('should clear all items from the cart and set newProducts to an empty array', async () => {
    spyOn(axios, 'delete').and.returnValue(Promise.resolve({data:0}));
    component.newProducts = [{ _id: 'abc' }, { _id: 'def' }];
    component.vaciarTodo();
    //expect(axios.delete).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/cart/123');
    expect(component.newProducts).toEqual(undefined);
  });
*/
  it('should calculate the total price of all items in the cart', () => {
    component.newProducts = [{ price: 10 }, { price: 20 }, { price: 30 }];
    expect(component.totalprice()).toEqual(60);
  });

  it('should open the payment modal', () => {
    spyOn(modalService, 'open');
    component.comprar();
    expect(modalService.open).toHaveBeenCalledWith(ModalComponent);
  });

  it('should return true if a product name contains "Pantalon"', () => {
    expect(component.contains('Pantalon')).toEqual(true);
  });

  it('should return false if a product name does not contain "Pantalon"', () => {
    expect(component.contains('Shirt')).toEqual(false);
  });
});