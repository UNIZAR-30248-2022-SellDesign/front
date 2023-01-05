import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { backURI } from 'src/environments/backURI';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit {

  nombreProducto: string = "";
  descripcion: string = "";
  precio: Number = 0;
  imagen: string = "";
  imagenDiseno: string = "";
  idUser: any
  tipo: Number = 0
  nombreTipo: string = '';
  esEditar:boolean = false
  esSubir:boolean = false
  idProducto: string = ''
  diseno = {_id: '',image: '',name:''}
  hayErrorFoto: boolean = false;
  error:boolean = false
  errorPrice:boolean = false
  designs= [{_id:'',name:''}]
  designName: string = "Diseño"
  idDesign: string = ""
  imageProduct:string = ""

  constructor(public modalRef: MdbModalRef<ModalEditProductComponent>) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    if(this.esEditar){
      this.imagenDiseno = this.diseno.image
      this.designName = this.diseno.name
      this.idDesign = this.diseno._id
      console.log(this.diseno)
    }else{
      this.imagenDiseno = this.diseno.image
    }
    this.getDesigns()
  }
  getDesigns(){
    this.idUser = localStorage.getItem('idUsuario')

    axios.get(backURI + "designs/" + this.idUser + "/0")
        .then(response => {
          let i
          for(i=0;i<response.data.length;i++){
            this.designs.push({_id:response.data[i]._id,name:response.data[i].name})
          }
          this.designs.shift()
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
  asignarTipo(tipo: Number){
    switch(tipo){
      case 1:
        this.tipo = 1
        this.nombreTipo = 'Camiseta'
        this.imageProduct = "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/441598/item/goods_00_441598.jpg?width=722&impolicy=quality_70&imformat=chrome"
        break
      case 2:
        this.tipo = 2
        this.nombreTipo = 'Pantalón'
        this.imageProduct = "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F8e%2F1a%2F8e1afc93481dd9c6545ef252ddf09bd42b56b794.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
        break
      case 3:
        this.tipo = 3
        this.nombreTipo = 'Sudadera'
        this.imageProduct = "https://img.abercrombie.com/is/image/anf/KIC_122-3572-1296-900_prod1?policy=product-large"
        break
    }
  }
  guardarDatos( precio: Number,descripcion: string, ){    
    if(precio != 0 && this.nombreTipo != 'Prenda'){
      if (precio >100 || precio<5 ){
        this.errorPrice = true
      }else{
        this.error = false
        this.errorPrice = false
        axios.post(backURI + "products/new", {
          design: this.idDesign, //id de un diseño random
          price: precio,
          type: this.tipo,
          image: this.imageProduct,
          description: descripcion,
          seller: this.idUser
        })
          .then((res) => {
    
            this.modalRef.close([{
              flag: 0
            }])
    
          }).catch((error) => {
            console.log(error);
          })
      }
    }else{
      this.error = true
    }
  }

  actualizarDatos(foto: string, nombre: string, idProducto: string, precio: Number, descripcion: string){
    if(precio<5 || precio>100){
      this.errorPrice = true
    }else{
      console.log("actualizar;", precio, this.tipo, foto, descripcion, idProducto, this.idDesign);
      
      axios.put(backURI + "products/update", {
        // design: nombre,  ????
        price: precio,
        type: this.tipo,
        image: foto,
        description: descripcion,
        _id: idProducto,
        design : this.idDesign
      })
        .then((res) => {
          this.modalRef.close([{
            flag: 1,
          }])
          
        }).catch((error) => {
          console.log(error);
        })
    } 
  }
  

  eliminarDatos(idProducto: string){
    //delete
    axios.delete(backURI + "products/delete/" + this.idUser + '/' + idProducto)
      .then((res) => {
      }).catch((error) => {
        console.log(error);
      })

    this.modalRef.close([{
      flag: 2,
      _id: idProducto,
    }])
  }

  onSelectFile(event : any) {    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evento) => { // called once readAsDataURL is completed
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
  asignDesign(_id:string,name:string){
    this.designName = name
    this.idDesign = _id
  }

}
