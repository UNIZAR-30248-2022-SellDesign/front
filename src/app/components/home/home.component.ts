import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { Product } from '../../models/product';
import { BuscadorService } from '../../services/buscador.service';


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
  // public lista:Array<any>

  constructor(private _servicio: BuscadorService) { }

  ngOnInit(): void {
    this.getIni()
    
    this._servicio.disparadorDeBusqueda.subscribe(data => {

      console.log('Result Tras disparador...', data.data.data);
      this.newProducts = data.data.data
      this.busqueda = data.data.busqueda
      this.flagView = false
    })
  }

  getIni(){
    axios.get(backURI + "products/" + this.contPageHome)
    .then(response => {
        // Obtenemos los datos
        this.newProducts = response.data
    })
    .catch(e => {
        // Capturamos los errores
        console.log(e);
        
    })
  }

  getMore() {
    // Home
    if(this.flagView){
      this.contPageHome += 1

      axios.get(backURI + "products/" + this.contPageHome)
        .then(response => {
            // Obtenemos los datos
            this.newProducts = this.newProducts.concat(response.data)
        })
        .catch(e => {
            // Capturamos los errores
            console.log(e);
            
        })
    } else{
      // Busqueda
      this.contPageBusqueda += 1

      axios.get(backURI + 'products/' + this.busqueda + '/' + this.contPageBusqueda)
        .then(response => {
            // Obtenemos los datos
            this.newProducts = this.newProducts.concat(response.data)
        })
        .catch(e => {
            // Capturamos los errores
            console.log(e);
            
        })
    }
    

    
  }

}
