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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModalEditDisenoComponent } from './components/modal-edit-diseno/modal-edit-diseno.component';
import { ModalEditProductComponent } from './components/modal-edit-product/modal-edit-product.component';

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
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ModalEditComponent,
    ModalEditDisenoComponent,
    ModalEditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    MdbModalModule
  ],
  providers: [AppRoutingProviders, MdbModalModule],
  bootstrap: [AppComponent]

})
export class AppModule { }
