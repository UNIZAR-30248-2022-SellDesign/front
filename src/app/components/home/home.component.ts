import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { Product } from '../../models/product';
import { BuscadorService } from '../../services/buscador.service';
import { ArgumentService } from 'src/app/services/argument.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // products: Product[] = [
  //   {productName:"Sudadera",designName:"buah",price:80,image:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"}
  // ];

  newProducts: any
  contPageHome = 0
  contPageBusqueda = 0
  flagView = true
  busqueda: string = ''
  esNovedad: boolean = false;
  esBusqueda: boolean = false;
  hayMas: boolean = false;
  noHayProductos: boolean = false;
  precio: string = 'Precio'
  tipo: string = 'Prenda'
  _min: Number = 0
  _max: Number = 0
  tipoEntero:Number = 0

  message : any
  
  constructor(private _servicio: BuscadorService, private argumentservice : ArgumentService) { }

  ngOnInit(): void {
    this.getIni()
    //this.argumentservice.currentargument.subscribe(message => this.message = message);
    this._servicio.disparadorDeBusqueda.subscribe(data => {

      console.log('Result Tras disparador...', data.data.data);
      this.newProducts = data.data.data
      this.busqueda = data.data.busqueda
      this.flagView = false
      this.contPageBusqueda = 0
      this.esNovedad = false
      this.esBusqueda = true
      this.precio = 'Precio'
      this.tipo = ''
      if(this.newProducts.length == 0 ){
        this.noHayProductos = true
        this.hayMas = false
      }else{
        this.noHayProductos = false
      }
    })
  }

  getIni(){
    console.log(backURI + "products/home/page/" + this.contPageHome);
    
    axios.get(backURI + "products/home/page/" + this.contPageHome)
    .then(response => {
        // Obtenemos los datos
        this.newProducts = response.data
        console.log(this.newProducts);
        this.esNovedad = true
        
        if(this.newProducts.length == 0){
            this.noHayProductos = true
        } else{
          this.noHayProductos = false
          this.hayMas = true
        }
    })
    .catch(e => {
        // Capturamos los errores
        console.log(e);
    })

    
  }

  getMore() {
    // Home
    if(this.flagView){
      this.esNovedad = true

      console.log('HOME');
      
      this.contPageHome += 1
      console.log(backURI + "products/home/page/" + this.contPageHome);
      axios.get(backURI + "products/home/page/" + this.contPageHome)
        .then(response => {
            // Obtenemos los datos
            this.newProducts = this.newProducts.concat(response.data)
            if(response.data.length < 8){
              this.noHayProductos = true
            
              if(response.data.length == 0) this.hayMas = false
            } else{
              this.noHayProductos = false
              this.hayMas = true
            }
        })
        .catch(e => {
            // Capturamos los errores
            console.log(e);
            
        })
    } else{
      // Busqueda
      this.esNovedad = false

      console.log('Busqueda');

      console.log('Valor flag', this.flagView);

      this.contPageBusqueda += 1
      console.log(backURI + 'products/search/' + this.busqueda + '/' + this.contPageBusqueda);
      

      axios.get(backURI + 'products/search/' + this.busqueda + '/' + this.contPageBusqueda)
        .then(response => {
            // Obtenemos los datos
            this.newProducts = this.newProducts.concat(response.data)
            if(response.data.length == 0){
              this.hayMas = false
              if(this.newProducts.length == 0) this.noHayProductos = true
            } else{
              this.noHayProductos = false
              this.hayMas = true
            }
        })
        .catch(e => {
            // Capturamos los errores
            console.log(e);
            
        })
    }
  }

  filterPrice(min:Number, max:Number){
    this.esBusqueda = true
    if(this.busqueda != ''){
      //Busqueda + Filtro
      axios.get(backURI + 'products/search/' + this.busqueda + '/'+ min + '/'  + max)
      .then(response => {
          // Obtenemos los datos
          this.newProducts = response.data
          
          if(response.data.length == 0){
            this.noHayProductos = true
          } else{
            this.noHayProductos = false
          }
          this.hayMas = false
      })
      .catch(e => {
          // Capturamos los errores
          console.log(e);
          
      })

    } else {
      //Filtro Home
      console.log('FILTRO');
      
      if(this.tipo == 'Prenda'){
        //Solo se filtra precio
        console.log('preecio', backURI + 'products/home/' + min + '/'  + max);

        axios.get(backURI + 'products/home/' + min + '/'  + max)
          .then(response => {
              // Obtenemos los datos
              this.newProducts = response.data
              if(this.newProducts.length == 0){
                this.noHayProductos = true
              } else{
                this.noHayProductos = false
              }
              this.hayMas = false

          })
          .catch(e => {
              // Capturamos los errores
              console.log(e);
              
          })
      }else{
        //Se filtra precio + tipo
        console.log('precio + tipo', backURI + 'products/home/' + min + '/'  + max  + '/' + this.tipoEntero);
        
        axios.get(backURI + 'products/home/' + min + '/'  + max  + '/' + this.tipoEntero)
          .then(response => {
              // Obtenemos los datos
              this.newProducts = response.data
              if(this.newProducts.length == 0){
                this.noHayProductos = true
              } else{
                this.noHayProductos = false
              }
          this.hayMas = false

          })
          .catch(e => {
              // Capturamos los errores
              console.log(e);
          })
      }
      
    }
    this._min = min
    this._max = max
    if(max==1000){
      this.precio = min.toString() + ' o más'
    }else{
      this.precio = min.toString() + ' - ' + max.toString() + ' €'
    }
  }

  sendArgument(argument:String){
    this.argumentservice.sendArgument(argument)
  }

  filterPrenda(tipo:Number){
    console.log('FILTRO PRENDA');
    
    this.esBusqueda = true
    this.tipoEntero = tipo
    if(this.precio == 'Precio'){
      //Solo se filtra prenda
      console.log('prenda:', backURI + 'products/home/' + tipo);
      
      axios.get(backURI + 'products/home/' + tipo)
      .then(response => {
          // Obtenemos los datos
          console.log('Response filterPrenda',response.data);
          
          this.newProducts = response.data
          console.log(this.newProducts);
          
          if(response.data.length == 0){
            this.noHayProductos = true
          } else{
            this.noHayProductos = false
          }
          this.hayMas = false

      })
      .catch(e => {
          // Capturamos los errores
          console.log(e);
          
      })
    }else{
      //Se filtra prenda + precio
      
      console.log('prenda + precio', backURI + 'products/home/' + this._min + '/'  + this._max  + '/' + this.tipoEntero);
        
      axios.get(backURI + 'products/home/' + this._min + '/'  + this._max  + '/' + this.tipoEntero)
        .then(response => {
            // Obtenemos los datos
            this.newProducts = response.data
            if(this.newProducts.length == 0){
              this.noHayProductos = true
            } else{
              this.noHayProductos = false
            }
            this.hayMas = false

        })
        .catch(e => {
            // Capturamos los errores
            console.log(e);
        })
    }
    
    switch(tipo){
      case 1:
        this.tipo = 'Camiseta'
        break
      case 2:
        this.tipo = 'Pantalón'
        break
      case 3:
        this.tipo = 'Sudadera'
        break
    }
  }

}
