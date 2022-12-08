import { Component } from '@angular/core';
import { MdbModalRef,MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class ModalComponent {

    constructor(public modalRef: MdbModalRef<ModalComponent>) {}
    close(){
        this.modalRef.close
    }
}