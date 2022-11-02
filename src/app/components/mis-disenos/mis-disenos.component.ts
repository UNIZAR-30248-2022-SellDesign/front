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

  noHayDesign : boolean = false
  newDesigns : any
  contPagemisDisenos = 0
  idUser: any
  modalRef: MdbModalRef<ModalEditDisenoComponent> | null = null;


  product: Product[] = [
    { productName: "Sudadera", designName: "buah", price: 10, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 20, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 30, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 70, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 50, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 60, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 70, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" },
    { productName: "Sudadera", designName: "buah", price: 80, image: "https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530" }
  ];
  
  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.newDesigns = null
    this.getMore();
  }

  getMore(){
    //get
    this.idUser = localStorage.getItem('idUsuario')

    // axios.get(backURI + "perfil/" + this.idUser + "/products/" + this.contPageDisenos)
    //     .then(response => {
    //       // Obtenemos los datos
    //       if (response.data.length == 0) {
    //         this.noHayDesign = true
    //       } else {
    //         this.noHayDesign = false
    //       }
    //       this.newDesigns = this.newDesigns.concat(response.data)
    //     })
    //     .catch(e => {
    //       // Capturamos los errores
    //       console.log(e);
    //     })

    this.contPagemisDisenos++
  }

  openModal(flag: Number, product: any) {//flag = 0 -> Editar; flag = 1 -> Subir; 
    if(flag == 0){
      this.modalRef = this.modalService.open(ModalEditDisenoComponent, {
        data: {nombreDiseno: product.designName,
               imagen: product.image,
               esEditar: true
        }
      })
    }else{
      this.modalRef = this.modalService.open(ModalEditDisenoComponent, {
        data: {nombreDiseno: "",
               imagen: "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg",
               esSubir: true
        }
      })
    }

    
  }
}
