import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/app/models/product';
import { backURI } from 'src/environments/backURI';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  providers: [MdbModalService],
  queries: {
    "tabsContentRef": new ViewChild("tabsContentRef")
  },
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  public selectedTab: boolean = false;
  public tabsContentRef!: ElementRef; // Using "definite assignment" assertion (query).
  contPageDisenos = 0
  contPageFav = 0
  noHayDisenos: boolean = true;
  hayErrorFoto: boolean = false;
  cargarMas: boolean = false;
  cargarMasFav: boolean = false;
  noHayFav: boolean = true;
  newProducts: any[] = []
  newFavs: any[] = []
  products= [{productId:'',productImage:'', designImage : '',name:'',price:0}]
  idUser: any
  modalRef: MdbModalRef<ModalEditComponent> | null = null;

  nombre: string = "";
  nombreObtenido: string = "";
  descripcion: string = "";
  descripcionObtenida: string = "";
  userName: any

  url: any = ''
  foto:any = ''

  product: Product[] = [
  ];

  masProducts: Product[] = [
  ];
  myProducts = [{productId:'',productImage:'', designImage : '',name:'',price:0}]
  constructor(private modalService: MdbModalService) {
    this.selectedTab = false;
  }

  ngOnInit(): void {

    this.getInfo()
    this.getMore(false) //obtener diseños (1a pag)
    this.getMore(true) //obtener fav (1a pag)
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I show the given tab.
  public show(tab: false | true): void {

    this.selectedTab = tab;
    // By default - the default behavior of the browser - when we change the content
    // of an overflow-container, the overflow-container doesn't change its scroll
    // offset unless it suddenly has less content than it did before. As such, when
    // the tab-content changes, we have to explicitly scroll the overflow-container
    // back to the top.
    this.scrollTabContentToTop();

  }

  getInfo(){
    //getInfo de nombreReal y descripcion   
    this.userName = localStorage.getItem('userName')
    axios.get(backURI + "users/user/" + this.userName)
        .then(response => {
          // Obtenemos los datos
          this.nombreObtenido = response.data.realname
          this.descripcionObtenida = response.data.description
          this.nombre = this.nombreObtenido
          this.descripcion = this.descripcionObtenida
          this.url = response.data.image
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
  
  getMore(seleccion: boolean) {
    this.idUser = localStorage.getItem('idUsuario')

    if (!seleccion) {
      //FALSE -> diseños en venta
      
      axios.get(backURI + "perfil/" + this.idUser + "/products/" + this.contPageDisenos)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMas = false            
            if(this.newProducts.length == 0){
              this.noHayDisenos = true
            }
          } else {
            this.noHayDisenos = false
            this.cargarMas = true

          }
          this.newProducts = this.newProducts.concat( response.data)
          this.getmyImagesFavs()
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageDisenos ++

    } else {

      //TRUE ->favoritos 
      axios.get(backURI + "perfil/" + this.idUser + "/fav/" + this.contPageFav)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMasFav = false
            
            if(this.newFavs.length == 0){
              this.noHayFav = true
            }
          } else {
            this.noHayFav = false
            this.cargarMasFav = true
          }
          
          this.newFavs = response.data
          this.getImagesFavs()
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageFav++
    }
  }
  contains(name:string){
    return name.includes("Pantalon")
  }
  getmyImagesFavs(){
    this.myProducts = [{productId:'',productImage:'', designImage : '',name:'',price:0}]
    for(let i= 0;i<this.newProducts.length;i++){
      axios.get(backURI+"products/get/"+this.newProducts[i]._id)
        .then(response => {
          // Obtenemos los datos
          this.getMyImageOfDesign(this.newProducts[i]._id,response.data.design._id,response.data.type+" "+response.data.design.name,response.data.image,response.data.price)
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
    }
    this.myProducts.shift()    
  }
  getImagesFavs(){
    this.products = [{productId:'',productImage:'', designImage : '',name:'',price:0}]
    for(let i= 0;i<this.newFavs.length;i++){
      axios.get(backURI+"products/get/"+this.newFavs[i].product)
        .then(response => {
          // Obtenemos los datos
          this.getImageOfDesign(this.newFavs[i].product,response.data.design._id,response.data.type+" "+response.data.design.name,response.data.image,response.data.price)
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
    }
    this.products.shift()    
  }
  getMyImageOfDesign(productId:string,_id:string,name:string,productImage:string,price:number){
    axios.get(backURI+"products/design/"+_id)
      .then(response => {
        // Obtenemos los datos
        this.myProducts.push({
          productId,
          productImage,
          designImage:response.data[0].design.image,
          price,
          name
        })
      })
      .catch(e => {
        // Capturamos los errores
        console.log(e);
      })
  }
  getImageOfDesign(productId:string,_id:string,name:string,productImage:string,price:number){
    axios.get(backURI+"products/design/"+_id)
      .then(response => {
        // Obtenemos los datos
        this.products.push({
          productId,
          productImage,
          designImage:response.data[0].design.image,
          price,
          name
        })
      })
      .catch(e => {
        // Capturamos los errores
        console.log(e);
      })
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalEditComponent, {
      data: {nombre: this.nombre,
             descripcion: this.descripcion}
    })
    this.modalRef.onClose.subscribe((data : any) => {
      if(data != undefined){
        this.nombre = data[0].nombre
        this.descripcion = data[0].descripcion
      }      
    });
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
                  this.url = response.data.data.media
                  // this.subirFoto(response.data.data.media)
                  var uName = localStorage.getItem('userName')
                  axios.post(backURI + "users/setImage", {
                    username: uName,
                    image: this.url,
                  })
                    .then(response => {                      
                    })
                    .catch(e => {
                      // Capturamos los errores
                      console.log(e);
                    })
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


  // ---
  // PRIVATE METHODS.
  // ---

  // I scroll the tab-content overflow-container back to the top.
  private scrollTabContentToTop(): void {
    this.tabsContentRef.nativeElement.scrollTo(0, 0);
  }

}
