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
  products: any
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
          console.log(response.data);
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
    console.log(seleccion);
    this.idUser = localStorage.getItem('idUsuario')

    if (!seleccion) {
      //FALSE -> diseños en venta
      console.log('EN PRODUCTOS');
      
      axios.get(backURI + "perfil/" + this.idUser + "/products/" + this.contPageDisenos)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMas = false
            console.log(this.cargarMas);
            
            if(this.newProducts.length == 0){
              this.noHayDisenos = true
            }
          } else {
            this.noHayDisenos = false
            this.cargarMas = true

          }
          this.newProducts = this.newProducts.concat(response.data)
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageDisenos ++

    } else {
      console.log('EN FAV');

      //TRUE ->favoritos 
      axios.get(backURI + "perfil/" + this.idUser + "/fav/" + this.contPageFav)
        .then(response => {
          // Obtenemos los datos
          if (response.data.length == 0) {
            this.cargarMasFav = false
            console.log('cargarmasfav', this.cargarMasFav);
            
            if(this.newFavs.length == 0){
              this.noHayFav = true
            }
          } else {
            this.noHayFav = false
            this.cargarMasFav = true
          }
          this.newFavs = this.newFavs.concat(response.data)
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
        this.contPageFav++
    }
  }
  
  openModal() {
    this.modalRef = this.modalService.open(ModalEditComponent, {
      data: {nombre: this.nombre,
             descripcion: this.descripcion}
    })
    this.modalRef.onClose.subscribe((data : any) => {
      console.log("openmodal de lcos");
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
        console.log(evento.target?.result);
        if(evento.target?.result != undefined){
          const formData = new FormData()
          formData.append('media', event.target.files[0])
          formData.append('key', '0000255a5921f1840e4f359f5679670c')

          axios.post('https://thumbsnap.com/api/upload', formData)
            .then(response => {
               if(response.status == 200){
                  this.hayErrorFoto = false
                  console.log('TODO HA IDO BIEN');
                  console.log(response.data.data.media);
                  this.url = response.data.data.media
                  // this.subirFoto(response.data.data.media)
                  var uName = localStorage.getItem('userName')
                  console.log(uName);
                  console.log(this.url);
                  axios.post(backURI + "users/setImage", {
                    username: uName,
                    image: this.url,
                  })
                    .then(response => {
                      console.log('Subida al back con éxito');
                      
                    })
                    .catch(e => {
                      // Capturamos los errores
                      console.log(e);
                    })
                }else{
                  //mensaje error
                  console.log('FALLO AL SUBIR FOTO');
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
