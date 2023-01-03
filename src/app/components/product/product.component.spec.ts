import { ProductComponent } from './product.component';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let route: ActivatedRoute;
  let router: Router;
  let modalService: MdbModalService;
  beforeEach(() => {
    // Create a test instance of the component
    component = new ProductComponent(route, router,modalService);

    // Set up a mock HTTP client using axios-mock-adapter

    // Define a mock response for the get request to backURI + 'products/get/' + this.id
    /*mock.onGet(backURI + 'products/get/' + component.id).reply(200, {
      name: 'Test Product',
      image: 'https://test.com/product.jpg',
      price: 100,
      type: 'physical',
      design: {
        name: 'Test Design',
        designer: '12345',
        _id: 'abcdef',
      },
      description: 'Test product description',
    });

    // Define a mock response for the get request to backURI + 'users/id/' + id
    mock.onGet(backURI + 'users/id/12345').reply(200, {
      name: 'Test Designer',
    });

    // Define a mock response for the get request to backURI + 'perfil/fav/' + this.idUser + '/' + this.id
    mock.onGet(backURI + 'perfil/fav/' + component.idUser + '/' + component.id).reply(200, []);

    // Define a mock response for the post request to backURI + 'cart/' + this.idUser + '/' + this.id
    mock.onPost(backURI + 'cart/' + component.idUser + '/' + component.id).reply(200);*/
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
    });
    it('should set viewProduct.favorite to true if product is in user favorites', fakeAsync(() => {
        component.idUser = 'user1';
        component.id = 'product1';
        component.viewProduct.favourite = false;
    
        // Mock the axios.get function
        spyOn(axios,'get').and.returnValue(Promise.resolve({data: ['product1']}))
        component.getFavorite();
        tick(1000)
        expect(component.viewProduct.favourite).toBe(true);
      }));
    
      it('should set viewProduct.favorite to false if product is not in user favorites', fakeAsync(() => {
        component.idUser = 'user1';
        component.id = 'product1';
        component.viewProduct.favourite = true;
    
        // Mock the axios.get function
        spyOn(axios,'get').and.returnValue(Promise.resolve({data: []}))
        component.getFavorite();
        tick(1000)
        expect(component.viewProduct.favourite).toBe(false);
      }));
      it('should make a POST request to the API to add product to user cart', () => {
        component.idUser = 'user1';
        component.id = 'product1';
    
        // Mock the axios.post function
        spyOn(axios,'post').and.returnValue(Promise.resolve({data: []}))
        
        component.addToCart();
        expect(axios.post).toHaveBeenCalledWith(backURI + 'cart/user1/product1');
      });
      it('should make a POST request to the API to add product to user cart with timeout ', fakeAsync(() => {
        component.idUser = 'user1';
        component.id = 'product1';
    
        // Mock the axios.post function
        spyOn(axios,'post').and.returnValue(Promise.resolve({data: []}))
        
        component.addToCart();
        tick(2500)
        expect(axios.post).toHaveBeenCalledWith(backURI + 'cart/user1/product1');
      }));
      
      it('should return false if a product name does not contain "Pantalon"', () => {
        expect(component.contains('Shirt')).toEqual(false);
      });

      it('should call getFavorite and set viewProduct.favourite to true if the product is in the users favorites', fakeAsync(() => {
        // Mock the axios.get function
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [{ _id: 'some-id' }] }))
    
        // Set the idUser and id properties
        component.idUser = 'user-id';
        component.id = 'product-id';
    
        // Call the function
        component.getFavorite();
        tick(1000)
        // Expect the get function to be called with the correct URL
        expect(axios.get).toHaveBeenCalledWith(backURI + 'perfil/fav/user-id/product-id');
    
        // Expect the viewProduct.favourite property to be true
        expect(component.viewProduct.favourite).toBe(true);
      }));

      it('actualizarFavorito to favorite', fakeAsync(() => {
        component.viewProduct.favourite=false
        // Mock the axios.get function
        spyOn(axios,'post').and.returnValue(Promise.resolve({}))
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [{ _id: 'some-id' }] }))
        // Set the idUser and id properties
        component.idUser = 'user-id';
        component.id = 'product-id';
        component.actualizarFavorito()

        tick(1000)
        // Expect the get function to be called with the correct URL
        expect(axios.get).toHaveBeenCalledWith(backURI + 'perfil/fav/user-id/product-id');
    
        // Expect the viewProduct.favourite property to be true
        expect(component.viewProduct.favourite).toBe(true);
      }));

      it('actualizarFavorito to not favorite', fakeAsync(() => {
        component.viewProduct.favourite=true
        // Mock the axios.get function
        spyOn(axios,'delete').and.returnValue(Promise.resolve({}))
        spyOn(axios,'get').and.returnValue(Promise.resolve({ data: [] }))
        // Set the idUser and id properties
        component.idUser = 'user-id';
        component.id = 'product-id';
        component.actualizarFavorito()

        tick(1000)
        // Expect the get function to be called with the correct URL
        expect(axios.get).toHaveBeenCalledWith(backURI + 'perfil/fav/user-id/product-id');
    
        // Expect the viewProduct.favourite property to be true
        expect(component.viewProduct.favourite).toBe(false);
      }));
    it('should send a GET request to the correct endpoint and correctly retrieve product information', fakeAsync(() => {
        // mock the axios get function
        let productInfo:{
            description: 'test description',
            name: 'test name',
            image: 'test image',
            price: 100,
            type: 'test type',
            design: {
                name: 'test design name',
                designer: 'test designer id',
                designerName: 'null',
                }
            }
            
    const axiosGetSpy = spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: {
        description: 'test description',
        name: 'test name',
        image: 'test image',
        price: 100,
        type: 'test type',
        design: {
            name: 'test design name',
            designer: 'test designer id',
            designerName: 'null',
            }
        } }));
    const getInfoDesignerSpy = spyOn(component,'getInfoDesigner');
    const getImagesOfDesignSpy = spyOn(component, 'getImagesOfDesign');
        // call the function
    component.getInfo();
    
    tick(1500)
    // assert that the axios get function was called with the correct endpoint
    expect(axiosGetSpy).toHaveBeenCalledWith(`${backURI}products/get/${component.id}`);
    expect(component.viewProduct.description).toEqual('test description');
    expect(component.viewProduct.productName).toEqual('test name');
    }));

    it('should set designer name from API response', fakeAsync(() => {
        // Mock axios get() method to return a predetermined response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { username: 'test-designer' } }));
    
        // Call getInfoDesigner() with a known id
        component.getInfoDesigner('123');
        tick(1000)
        // Assert that designerName has been set to the expected value
        expect(component.viewProduct.designerName).toEqual('test-designer');
      }));
      /*it('getImagesOfDesign', fakeAsync(() => {
        // Mock axios get() method to return a predetermined response
        spyOn(axios, 'get').and.returnValue(Promise.resolve({response:{ data: [
        { _id: '123', image: 'image1.jpg', type: 'shirt' },
        { _id: '456', image: 'image2.jpg', type: 'shirt' },
        { _id: '789', image: 'image3.jpg', type: 'shirt' }] }}));
    
        // Call getInfoDesigner() with a known id
        component.getImagesOfDesign('12345');
        tick(3000)
        // Assert that designerName has been set to the expected value
        expect(component.imagesDesignFuncional).toEqual([
            { id: '123', imageDesign: 'image1.jpg', type: 'shirt' },
            { id: '456', imageDesign: 'image2.jpg', type: 'shirt' },
            { id: '789', imageDesign: 'image3.jpg', type: 'shirt' }
          ]);
      }));*/

});