import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Maps
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
//Rutas
import {routing, appRoutingProviders} from './app.routing';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { LoginErrorComponent } from './components/login-error.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';

import { UsuariosListComponent } from './components/usuarios-list.component';
import { UsuarioAddComponent } from './components/usuario-add.component';

import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductoDetailComponent } from './components/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit.component';

import { ClientesListComponent } from './clientes/clientes-list.component';
import { ClienteAddComponent } from './clientes/cliente-add.component';
import { ClienteDetailComponent } from './clientes/cliente-detail.component';
import { ClienteEditComponent } from './clientes/cliente-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginErrorComponent,
    HomeComponent,
    ErrorComponent,
    UsuariosListComponent,
    UsuarioAddComponent,
    ProductosListComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent,
    ClientesListComponent,
    ClienteAddComponent,
    ClienteDetailComponent,
    ClienteEditComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCc3YdY2qpqHP9V7rY4WEyuzi7UxS5gE14'
    })
  ],
  providers: [
  	appRoutingProviders
  	],
  bootstrap: [AppComponent]
})
export class AppModule { }
