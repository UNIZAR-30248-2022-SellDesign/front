import { Component } from '@angular/core';
import { MdbModalRef,MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class ModalComponent {
    name: string = "";
    namecard: string = "";
    email: string = "";
    cardNumber: string = "";
    address: string = "";
    city: string = "";
    month: string = "";
    year: string = "";
    state: string = "";
    zipCode: string = "";
    CVV: string = "";
    

    // Possible errors:
    nameEmpty: boolean = false;
    namecardEmpty: boolean = false;
    emailEmpty: boolean = false;
    cardNumberEmpty: boolean = false;
    addressEmpty: boolean = false;
    cityEmpty: boolean = false;
    monthEmpty: boolean = false;
    yearEmpty: boolean = false;
    stateEmpty: boolean = false;
    zipCodeEmpty: boolean = false;
    CVVEmpty: boolean = false;
    errors: boolean = false;
    success:boolean = false;

    constructor(public modalRef: MdbModalRef<ModalComponent>) {}
    close(){
        this.modalRef.close
    }
    pay(){
        this.errors = false;
        this.nameEmpty = false;
        this.namecardEmpty = false;
        this.emailEmpty = false;
        this.cardNumberEmpty = false;
        this.addressEmpty = false;
        this.cityEmpty = false;
        this.monthEmpty = false;
        this.yearEmpty = false;
        this.stateEmpty = false;
        this.zipCodeEmpty = false;
        this.CVVEmpty = false;
        this.success = false;
    
        if (this.name == "") {
        this.nameEmpty = true;
        this.errors = true;
        }
        if (this.namecard == "") {
        this.namecardEmpty = true;
        this.errors = true;
        }
        if (this.email == "") {
            this.emailEmpty = true;
            this.errors = true;
        }
        if (this.cardNumber == "") {
        this.cardNumberEmpty = true;
        this.errors = true;
        }
        if (this.city == "") {
        this.cityEmpty = true;
        this.errors = true;
        }
        if (this.zipCode == "") {
        this.zipCodeEmpty = true;
        this.errors = true;
        }
        if (this.address == "") {
        this.addressEmpty = true;
        this.errors = true;
        }
        if (this.month == "") {
        this.monthEmpty = true;
        this.errors = true;
        }
        if (this.year == "") {
        this.yearEmpty = true;
        this.errors = true;
        }
        if (this.CVV == "") {
        this.CVVEmpty = true;
        this.errors = true;
        }
        if (this.state == "") {
        this.stateEmpty = true;
        this.errors = true;
        }
        if (!this.errors) {
            this.success = true;
            window.setTimeout(() => {
                this.modalRef.close()
            }, 2000);
            
        }else{
            alert('Te faltan algunos campos de rellenar o son incorrectos')            
        }
    }
}