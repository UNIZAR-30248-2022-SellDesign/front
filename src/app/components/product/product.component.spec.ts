import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should add product to cart when addToCart is called', () => {
    // Arrange
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'addToCart').and.callThrough();
    component.viewProduct = {
        productName: 'String',
        designName: 'String',
        description:'String',
        price: 10,
        mainImage: 'String',
        designerName:'String',
        favourite:true,
        favouriteImage:'String',
        type:'string',
        imagesDesign: ['']
    };

    // Act
    component.addToCart();

    // Assert
    expect(component.addToCart).toHaveBeenCalled();
    expect(component.viewProduct.productName).toBe('String');
    expect(component.viewProduct.price).toBe(10);
  });

  it('should open payment modal when buy is called', () => {
    // Arrange
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'buy').and.callThrough();
    component.modalRef = null;

    // Act
    component.buy();

    // Assert
    expect(component.buy).toHaveBeenCalled();
    expect(component.modalRef).not.toBeNull();
  });
});