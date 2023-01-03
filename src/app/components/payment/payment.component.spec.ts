import { ModalComponent } from './payment.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

describe('Payment', () => {
  let component: ModalComponent;
  let modalRef: MdbModalRef<ModalComponent>;

  beforeEach(() => {
    modalRef = jasmine.createSpyObj('MdbModalRef', ['close']);
    component = new ModalComponent(modalRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the success flag and close the modal after a successful payment', () => {
    component.name = 'John Smith';
    component.namecard = 'John Smith';
    component.email = 'john@smith.com';
    component.cardNumber = '1234 1234 1234 1234';
    component.address = '123 Main St';
    component.city = 'New York';
    component.month = '01';
    component.year = '2022';
    component.state = 'NY';
    component.zipCode = '12345';
    component.CVV = '123';

    component.pay();

    expect(component.success).toBeTruthy();
    expect(modalRef.close).toHaveBeenCalled();
  });

  it('should set the error flags and not close the modal after an unsuccessful payment', () => {
    component.name = '';
    component.namecard = '';
    component.email = '';
    component.cardNumber = '';
    component.address = '';
    component.city = '';
    component.month = '';
    component.year = '';
    component.state = '';
    component.zipCode = '';
    component.CVV = '';

    component.pay();

    expect(component.nameEmpty).toBeTruthy();
    expect(component.namecardEmpty).toBeTruthy();
    expect(component.emailEmpty).toBeTruthy();
    expect(component.cardNumberEmpty).toBeTruthy();
    expect(component.addressEmpty).toBeTruthy();
    expect(component.cityEmpty).toBeTruthy();
    expect(component.monthEmpty).toBeTruthy();
    expect(component.yearEmpty).toBeTruthy();
  });
});