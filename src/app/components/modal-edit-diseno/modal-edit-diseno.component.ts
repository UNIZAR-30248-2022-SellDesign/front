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
  idUser: any
  esEditar:boolean = false
  esSubir:boolean = false
  idDiseno: string = ''

  constructor(public modalRef: MdbModalRef<ModalEditDisenoComponent>) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    console.log(this.nombreDiseno);
    console.log(this.imagen);
  }

  guardarDatos(foto: string, nombre: string ){
    console.log('guardando diseño...')
    //post
    console.log(foto);
    console.log(nombre);

    axios.post(backURI + "designs/new", {
      name: nombre,
      image: foto,
      id: this.idUser
    })
      .then((res) => {
        console.log('guardarDatos:')
        console.log(res)

        this.modalRef.close([{
          flag: 0,
          name: nombre,
          image: foto,
          _id: ''
        }])
        
      }).catch((error) => {
        console.log(error);
      })

    
  }

  actualizarDatos(foto: string, nombre: string, idDiseno: string ){
    //put
    axios.put(backURI + "designs/update", {
      name: nombre,
      image: foto,
      id: idDiseno,
    })
      .then((res) => {
        console.log('actualizarDatos res:')
        console.log(res)

        this.modalRef.close([{
          flag: 1,
          name: nombre,
          image: foto,
          _id: idDiseno,
        }])
        
      }).catch((error) => {
        console.log(error);
      })

    
  }

  eliminarDatos(idDiseno: string){
    console.log('eliminando diseño...')
    //delete
    axios.delete(backURI + "designs/delete/" + this.idUser + '/' + idDiseno)
      .then((res) => {
        console.log('eliminarDatos:')
        console.log(res)
        
      }).catch((error) => {
        console.log(error);
      })

    this.modalRef.close([{
      flag: 2,
      _id: idDiseno,
    }])
  }

}
