import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Maps
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';

//Rutas
import {routing, appRoutingProviders} from './app.routing';

//Components
import { LoginComponent } from './login/login.component';
import { LoginErrorComponent } from './login/login-error.component';
import { HomeComponent } from './homePage/home.component';
import { ErrorComponent } from './homePage/error.component';

import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuarioAddComponent } from './usuarios/usuario-add.component';
import { UsuarioDetailComponent } from './usuarios/usuario-detail.component';

import { RolesListComponent } from './roles/roles-list.component';
import { RolAddComponent } from './roles/rol-add.component';
import { RolDetailComponent } from './roles/rol-detail.component';

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

import { StockListComponent } from './stock/stock-list.component';
import { StockAddComponent } from './stock/stock-add.component';
import { StockDetailComponent } from './stock/stock-detail.component';

import { FabricaListComponent } from './fabrica/fabrica-list.component';
import { FabricaAddComponent } from './fabrica/fabrica-add.component';
//import { FabricaDetailComponent } from './fabrica/fabrica-detail.component';

import { RutaListComponent } from './ruta/ruta-list.component';
import { RutaAddComponent } from './ruta/ruta-add.component';
//import { RutaDetailComponent } from './ruta/ruta-detail.component';

import { RepartoListComponent } from './reparto/reparto-list.component';
import { RepartoAddComponent } from './reparto/reparto-add.component';
//import { RepartoDetailComponent } from './reparto/reparto-detail.component';

import { VehiculoListComponent } from './vehiculo/vehiculo-list.component';
import { VehiculoAddComponent } from './vehiculo/vehiculo-add.component';
//import { VehiculoDetailComponent } from './vehiculo/vehiculo-detail.component';

//import { VehiculoListComponent } from './vehiculo/vehiculo-list.component';
import { VentaAddComponent } from './venta/venta-add.component';
//import { VehiculoDetailComponent } from './vehiculo/vehiculo-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginErrorComponent,
    
    HomeComponent,
    ErrorComponent,
    
    UsuariosListComponent,
    UsuarioAddComponent,
    UsuarioDetailComponent,

    RolesListComponent,
    RolAddComponent,
    RolDetailComponent,
    
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
    ListaPrecioDetailComponent,

    StockListComponent,
    StockAddComponent,
    StockDetailComponent,

    FabricaListComponent,
    FabricaAddComponent,
  //  FabricaDetailComponent,

    RutaListComponent,
    RutaAddComponent,
//  RutaDetailComponent,

    RepartoListComponent,
    RepartoAddComponent,
//  RepartoDetailComponent,

    VehiculoListComponent,
    VehiculoAddComponent,
//  VehiculoDetailComponent,

//    VentaListComponent,
    VentaAddComponent
//  VentaDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
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
