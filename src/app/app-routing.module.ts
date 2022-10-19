import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {MisDisenosComponent} from './components/mis-disenos/mis-disenos.component';
import {MisProductosComponent} from './components/mis-productos/mis-productos.component';
import {MiCarritoComponent} from './components/mi-carrito/mi-carrito.component';
import { ErrorComponent } from './components/error/error.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Perfil', component: PerfilComponent},
  {path: 'MisDiseños', component: MisDisenosComponent},
  {path: 'MisProductos', component: MisProductosComponent},
  {path: 'MiCarrito/:nombre', component: MiCarritoComponent},
  {path: '**', component: ErrorComponent}
  
];

export const AppRoutingProviders: any[] = [];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
