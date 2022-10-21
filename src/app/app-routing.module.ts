import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import {HomeComponent} from './components/home/home.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {MisDisenosComponent} from './components/mis-disenos/mis-disenos.component';
import {MisProductosComponent} from './components/mis-productos/mis-productos.component';
import {MiCarritoComponent} from './components/mi-carrito/mi-carrito.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'Perfil', component: PerfilComponent},
  {path: 'MisDiseños', component: MisDisenosComponent},
  {path: 'MisProductos', component: MisProductosComponent},
  {path: 'MiCarrito/:nombre', component: MiCarritoComponent},
  {path: '**', component: ErrorComponent},

];

export const AppRoutingProviders: any[] = [];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
