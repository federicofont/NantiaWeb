import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pagina principal y de error si no hay pagina.
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';

// Components
import { LoginComponent } from './components/login.component';
import { LoginErrorComponent } from './components/login-error.component';

import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuarioAddComponent } from './usuarios/usuario-add.component';

import { ProductosListComponent } from './productos/productos-list.component';
import { ProductoAddComponent } from './productos/producto-add.component';
import { ProductoDetailComponent } from './productos/producto-detail.component';
import { ProductoEditComponent } from './productos/producto-edit.component';

import { ClientesListComponent } from './clientes/clientes-list.component';
import { ClienteAddComponent } from './clientes/cliente-add.component';
import { ClienteDetailComponent } from './clientes/cliente-detail.component';

import { MapaComponent } from './mapa/mapa.component';

import { EnvasesListComponent } from './envases/envases-list.component';
import { EnvaseAddComponent } from './envases/envase-add.component';
import { EnvaseDetailComponent } from './envases/envase-detail.component';
import { EnvaseEditComponent } from './envases/envase-edit.component';

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
{path: 'clientes/:id', component: ClienteDetailComponent},
{path: 'cliente-edit/:id', component: ClienteAddComponent},
{path: 'cliente-add', component: ClienteAddComponent},
{path: 'envases', component: EnvasesListComponent},
{path: 'envases/:id', component: EnvaseDetailComponent},
{path: 'envase-add', component: EnvaseAddComponent},
{path: 'envase-edit/:id', component: EnvaseEditComponent},
{path: 'mapa', component: MapaComponent},
{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
