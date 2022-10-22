import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
  export class BarraNavegacionComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      console.log(params);
      
    });
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
