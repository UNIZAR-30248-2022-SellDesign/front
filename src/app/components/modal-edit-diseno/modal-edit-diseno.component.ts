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
  hayErrorFoto: boolean = false;
  error: boolean = false

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

    if(nombre != '' && foto != 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1…trip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg'){
      this.error = false
      axios.post(backURI + "designs/new", {
        name: nombre,
        image: foto,
        id: this.idUser
      })
        .then((res) => {  
          this.modalRef.close([{
            flag: 0,
            name: nombre,
            image: foto,
            _id: ''
          }])
          
        }).catch((error) => {
          console.log(error);
        })
    }else{
      this.error = true
    }
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
      }).catch((error) => {
        console.log(error);
      })

    this.modalRef.close([{
      flag: 2,
      _id: idDiseno,
    }])
  }

  onSelectFile(event : any) {
    console.log('onSelectFile');
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evento) => { // called once readAsDataURL is completed
        console.log(evento.target?.result);
        if(evento.target?.result != undefined){
          const formData = new FormData()
          formData.append('media', event.target.files[0])
          formData.append('key', '0000255a5921f1840e4f359f5679670c')
          axios.post('https://thumbsnap.com/api/upload', formData)
            .then(response => {
               if(response.status == 200){
                  this.hayErrorFoto = false
                  this.imagen = response.data.data.media

                }else{
                  //mensaje error
                  this.hayErrorFoto = true
                  const myTimeout = setTimeout( () => {
                    this.hayErrorFoto = false
                    
                  }, 3000);
                }
            })
            .catch(e => {
              // Capturamos los errores
              console.log(e);
            })

         
        }

      }
    }
  }

}
