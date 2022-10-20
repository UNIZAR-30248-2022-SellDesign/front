import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MisDisenosComponent } from './components/mis-disenos/mis-disenos.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { MiCarritoComponent } from './components/mi-carrito/mi-carrito.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    HomeComponent,
    PerfilComponent,
    MisDisenosComponent,
    MisProductosComponent,
    MiCarritoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent]

})
export class AppModule { }
