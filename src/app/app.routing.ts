import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
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

import { MapaComponent } from './mapa/mapa.component';



const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'login_error', component: LoginErrorComponent},
{path: 'home', component: HomeComponent},
{path: 'usuarios', component: UsuariosListComponent},
{path: 'usuarios/:id', component: UsuariosListComponent},
{path: 'usuario-add/:id', component: UsuarioAddComponent},
{path: 'usuario-add', component: UsuarioAddComponent},
{path: 'productos', component: ProductosListComponent},
{path: 'productos/:id', component: ProductoDetailComponent},
{path: 'producto-edit/:id', component: ProductoEditComponent},
{path: 'producto-add', component: ProductoAddComponent},
{path: 'clientes', component: ClientesListComponent},
{path: 'clientes/:id', component: ClientesListComponent},
{path: 'cliente-edit/:id', component: ClienteAddComponent},
{path: 'cliente-add', component: ClienteAddComponent},
{path: 'mapa', component: MapaComponent},
{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
