import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
  	appRoutingProviders
  	],
  bootstrap: [AppComponent]
})
export class AppModule { }
