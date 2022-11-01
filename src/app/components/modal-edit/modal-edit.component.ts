import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { backURI } from 'src/environments/backURI';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  nombre: string = "";
  nombreObtenido: string = "";
  descripcion: string = "";
  descripcionObtenida: string = "";
  session: any
  userName: any
  data: any

  constructor(public modalRef: MdbModalRef<ModalEditComponent>) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
     
    
  }

  guardarDatos(){
    console.log('guardar datos');
    //Guardar nombre
    console.log(this.nombre);
    console.log(this.descripcion);
    
    if(this.nombre != this.nombreObtenido){ 
      axios.post(backURI + "users/setRealName", {
        username: this.userName,
        realname: this.nombre,
      })
        .then((res) => {
          console.log('NOMBRE:')
          console.log(res)
          
        }).catch((error) => {
          console.log(error);
        })
    }
    //Guardar descripcion
    if(this.descripcion != this.descripcionObtenida){
      axios.post(backURI + "users/setDescription", {
        username: this.userName,
        description: this.descripcion,
      })
        .then((res) => {
          console.log('DESCRIPTION:')
          console.log(res)
          
        }).catch((error) => {
          console.log(error);
        })
    }
    
    this.data = [{nombre: this.nombre, descripcion: this.descripcion}]
    this.modalRef.close(this.data)
  }

}
