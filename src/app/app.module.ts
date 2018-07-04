import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//import { MaterialModule } from './material.module';

//Maps
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';

//Rutas
import {routing, appRoutingProviders} from './app.routing';

//Components
import { LoginComponent } from './login/login.component';
import { LoginErrorComponent } from './login/login-error.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';

import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuarioAddComponent } from './usuarios/usuario-add.component';

import { ProductosListComponent } from './productos/productos-list.component';
import { ProductoAddComponent } from './productos/producto-add.component';
import { ProductoDetailComponent } from './productos/producto-detail.component';

import { ClientesListComponent } from './clientes/clientes-list.component';
import { ClienteAddComponent } from './clientes/cliente-add.component';
import { ClienteDetailComponent } from './clientes/cliente-detail.component';

import { EnvasesListComponent } from './envases/envases-list.component';
import { EnvaseAddComponent } from './envases/envase-add.component';
import { EnvaseDetailComponent } from './envases/envase-detail.component';
import { EnvaseEditComponent } from './envases/envase-edit.component';

import { ListaPreciosListComponent } from './listaprecios/listasprecios-list.component';
import { ListaPrecioAddComponent } from './listaprecios/listaprecio-add.component';
import { ListaPrecioDetailComponent } from './listaprecios/listaprecio-detail.component';

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
    
    ClientesListComponent,
    ClienteAddComponent,
    ClienteDetailComponent,
    
    MapaComponent,
    
    EnvasesListComponent,
    EnvaseAddComponent,
    EnvaseDetailComponent,
    EnvaseEditComponent,
    
    ListaPreciosListComponent,
    ListaPrecioAddComponent,
    ListaPrecioDetailComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
   // MaterialModule,
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
