import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  providers: [MdbModalService],
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  hayDesignBoton : boolean = false
  hayDesign : boolean = false
  newProducts : any[] = []
  aux : any[] = [{_id: '', name: '', image: ''}]
  contPagemisDisenos = 0
  idUser: any
  modalRef: MdbModalRef<ModalEditProductComponent> | null = null;
  tipo: Number = 0;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getMore();
  }


  getMore(){
    //get
    this.idUser = localStorage.getItem('idUsuario')

    axios.get(backURI + "products/user/" + this.idUser + "/" + this.contPagemisDisenos)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length != 0) {
            this.hayDesignBoton = true
            this.hayDesign = true
            this.newProducts = this.newProducts.concat(response.data)
            this.contPagemisDisenos++
          } else {
            this.hayDesignBoton = false
            if(this.contPagemisDisenos == 0){
            this.hayDesign = false
            }
          }
          console.log('response mis-productos');
          console.log(response.data);
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })

  }

  openModal(flag: Number, product: any) {//flag = 0 -> Editar; flag = 1 -> Subir; 
    if(flag == 0){
      if(product.type == 'Camiseta'){
        this.tipo = 1
      }else if(product.type == 'Pantalon' || product.type == 'Pantalón'){
        this.tipo = 2
      }else{
        this.tipo = 3
      }
      this.modalRef = this.modalService.open(ModalEditProductComponent, {
        modalClass: 'modal-lg',
        data: {
               descripcion: product.description,
               nombreTipo: product.type,
               diseno: product.design,
               imagen: product.image,
               precio: product.price,
               idProducto: product._id,
               tipo: this.tipo,
               esEditar: true,
        }
      })
    }else{
      this.modalRef = this.modalService.open(ModalEditProductComponent, {
        modalClass: 'modal-lg',
        data: {nombreProducto: "",
               imagen: "",
               esSubir: true,
               idProducto: '',
               tipo: this.tipo,
               precio: 0,
               descripcion: '',
               nombreTipo: 'Prenda',
        }
      })
    }

    this.modalRef.onClose.subscribe((data : any) => {
      console.log("openmodal de lcos");

      // COMPROBAR QUE FUNCIONE UNA VEZ HAYA PETICIONES
      
      if(data != undefined){
        // this.aux[0]._id = data[0]._id
        // this.aux[0].image = data[0].image
        // this.aux[0].name = data[0].name
        if(data[0].flag == 0){ //subir
          console.log('en subir');
          
          this.contPagemisDisenos= 0
          this.newProducts = []
          this.getMore()
        }else if(data[0].flag == 1){ //actualizar
          this.contPagemisDisenos = 0
          this.newProducts = []
          this.getMore()
        }else if(data[0].flag == 2){ //eliminar
          this.newProducts = this.newProducts.filter(x => x._id != data[0]._id);
        }
      }      
    });
  
  }
}
