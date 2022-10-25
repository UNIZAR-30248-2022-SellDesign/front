import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { BuscadorService } from '../../services/buscador.service';

@Component({
  selector: 'barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
  export class BarraNavegacionComponent implements OnInit {

  busqueda: string = "" 
  resultBusqueda: any

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _servicio: BuscadorService
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      console.log(params);
      
    });
  }

  async buscar(){
    if(this.busqueda != ""){

      await axios.get(backURI + 'products/search/' + this.busqueda + '/' + 0)
      .then(response => {
          // Obtenemos los datos
          this.resultBusqueda = response.data
          console.log('ResultBusqueda',this.resultBusqueda);
          
      })
      .catch(e => {
          // Capturamos los errores
          console.log(e);
      })

      // if(this.resultBusqueda.length != 0){
      //   let ObjBusqueda = {data: this.resultBusqueda, busqueda: this.busqueda}
      //   this._servicio.disparadorDeBusqueda.emit({
      //     data:ObjBusqueda
      //   })
      // }
      let ObjBusqueda = {data: this.resultBusqueda, busqueda: this.busqueda}
        this._servicio.disparadorDeBusqueda.emit({
          data:ObjBusqueda
        })
    }
  }

  cerrarSesion(){
      axios.get("https://selldesign-backend.onrender.com/users/logout", { 
      }).then((res) => {
        if(res.status == 200) {
          localStorage.removeItem('session')
          this._router.navigate(['/login'])
        }
      }).catch((error) => {
          console.log(error);
          alert("No se ha podido cerrar sesión");
        })
  }
}
