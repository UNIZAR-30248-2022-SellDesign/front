import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from '../modal-edit-diseno/modal-edit-diseno.component';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';

@Component({
  selector: 'app-mis-disenos',
  templateUrl: './mis-disenos.component.html',
  providers: [MdbModalService],
  styleUrls: ['./mis-disenos.component.css']
})
export class MisDisenosComponent implements OnInit {

  hayDesignBoton : boolean = false
  hayDesign : boolean = false
  newDesigns : any[] = []
  aux : any[] = [{_id: '', name: '', image: ''}]
  contPagemisDisenos = 0
  idUser: any
  modalRef: MdbModalRef<ModalEditDisenoComponent> | null = null;


  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getMore();
  }

  getMore(){
    //get
    this.idUser = localStorage.getItem('idUsuario')

    axios.get(backURI + "designs/" + this.idUser + "/" + this.contPagemisDisenos)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length != 0) {
            this.hayDesignBoton = true
            this.hayDesign = true
            this.newDesigns = this.newDesigns.concat(response.data)
            this.contPagemisDisenos++
          } else {
            this.hayDesignBoton = false
            if(this.contPagemisDisenos == 0){
            this.hayDesign = false
            }
          }
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })

  }

  openModal(flag: Number, product: any) {//flag = 0 -> Editar; flag = 1 -> Subir; 
    if(flag == 0){
      this.modalRef = this.modalService.open(ModalEditDisenoComponent, {
        data: {nombreDiseno: product.name,
               imagen: product.image,
               esEditar: true,
               idDiseno: product._id
        }
      })
    }else{
      this.modalRef = this.modalService.open(ModalEditDisenoComponent, {
        data: {nombreDiseno: "",
               imagen: "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg",
               esSubir: true,
               idDiseno: ''
        }
      })
    }

    this.modalRef.onClose.subscribe((data : any) => {
      if(data != undefined){
        this.aux[0]._id = data[0]._id
        this.aux[0].image = data[0].image
        this.aux[0].name = data[0].name
        if(data[0].flag == 0){ //concatenar
          this.contPagemisDisenos = 0
          this.newDesigns = []
          this.getMore()
        }else if(data[0].flag == 1){ //actualizar
          var aux = this.contPagemisDisenos;
          this.contPagemisDisenos = 0
          this.newDesigns = []
          this.getMore()

          
        }else if(data[0].flag == 2){ //eliminar
          this.newDesigns = this.newDesigns.filter(x => x._id != data[0]._id);
        }
      }      
    });
  
  }
}
