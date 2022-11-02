import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { backURI } from 'src/environments/backURI';

@Component({
  selector: 'app-modal-edit-diseno',
  templateUrl: './modal-edit-diseno.component.html',
  styleUrls: ['./modal-edit-diseno.component.css']
})
export class ModalEditDisenoComponent implements OnInit {

  nombreDiseno: string = "";
  imagen: string = "";
  userName: any
  
  esEditar:boolean = false
  esSubir:boolean = false

  constructor(public modalRef: MdbModalRef<ModalEditDisenoComponent>) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
    console.log(this.nombreDiseno);
    console.log(this.imagen);
    console.log(this.esEditar);
    
  }

  guardarDatos(foto: string, nombre: string ){
    console.log('guardando diseño...')
    //post
    console.log(foto);
    console.log(nombre);

    // axios.post(backURI + "misDisenos", {
    //   username: this.userName,
    //   image: foto,
    //   namedesign: nombre,
    // })
    //   .then((res) => {
    //     console.log('guardarDatos:')
    //     console.log(res)
        
    //   }).catch((error) => {
    //     console.log(error);
    //   })

    this.modalRef.close() //this.modalRef.close(this.data) para pasar datos
  }

  actualizarDatos(foto: string, nombre: string){
    console.log('actualizando diseño...')
    //put

    // axios.post(backURI + "actuDisenos", {
    //   username: this.userName,
    //   image: foto,
    //   namedesign: nombre,
    // })
    //   .then((res) => {
    //     console.log('actualizarDatos:')
    //     console.log(res)
        
    //   }).catch((error) => {
    //     console.log(error);
    //   })

    this.modalRef.close() //this.modalRef.close(this.data) para pasar datos
  }

  eliminarDatos(){
    console.log('eliminando diseño...')
    //delete

    // axios.delete(backURI + "deleteDisenos", {
    //   username: this.userName,
    //   image: foto,
    //   namedesign: nombre,
    // })
    //   .then((res) => {
    //     console.log('actualizarDatos:')
    //     console.log(res)
        
    //   }).catch((error) => {
    //     console.log(error);
    //   })

    this.modalRef.close() //this.modalRef.close(this.data) para pasar datos

  }

}
