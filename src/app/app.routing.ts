import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

import { ModuleWithProviders } from "@angular/core";
//Pagina principal y de error si no hay pagina.
//import { HomeComponent } from './homePage/home.component';
//import { ErrorComponent } from './homePage/error.component';

// Components
//import { LoginComponent } from './login/login.component';
//import { LoginErrorComponent } from './login/login-error.component';

import { UsuariosListComponent } from "./usuarios/usuarios-list.component";
import { UsuarioAddComponent } from "./usuarios/usuario-add.component";
import { UsuarioDetailComponent } from "./usuarios/usuario-detail.component";

import { RolesListComponent } from "./roles/roles-list.component";
import { RolAddComponent } from "./roles/rol-add.component";
import { RolDetailComponent } from "./roles/rol-detail.component";

import { ProductosListComponent } from "./productos/productos-list.component";
import { ProductoAddComponent } from "./productos/producto-add.component";
import { ProductoDetailComponent } from "./productos/producto-detail.component";

import { ClientesListComponent } from "./clientes/clientes-list.component";
import { ClienteAddComponent } from "./clientes/cliente-add.component";
import { ClienteDetailComponent } from "./clientes/cliente-detail.component";

import { MapaComponent } from "./mapa/mapa.component";

import { EnvasesListComponent } from "./envases/envases-list.component";
import { EnvaseAddComponent } from "./envases/envase-add.component";
import { EnvaseDetailComponent } from "./envases/envase-detail.component";
import { EnvaseEditComponent } from "./envases/envase-edit.component";

import { ListaPreciosListComponent } from "./listaprecios/listasprecios-list.component";
import { ListaPrecioAddComponent } from "./listaprecios/listaprecio-add.component";
import { ListaPrecioDetailComponent } from "./listaprecios/listaprecio-detail.component";

import { StockListComponent } from "./stock/stock-list.component";
import { StockAddComponent } from "./stock/stock-add.component";
import { StockDetailComponent } from "./stock/stock-detail.component";

import { FabricaListComponent } from "./fabrica/fabrica-list.component";
import { FabricaAddComponent } from "./fabrica/fabrica-add.component";
//import { FabricaDetailComponent } from './fabrica/fabrica-detail.component';

import { RutaListComponent } from "./ruta/ruta-list.component";
import { RutaAddComponent } from "./ruta/ruta-add.component";
//import { RutaDetailComponent } from './ruta/ruta-detail.component';

import { RepartoListComponent } from "./reparto/reparto-list.component";
import { RepartoAddComponent } from "./reparto/reparto-add.component";
//import { RepartoDetailComponent } from './reparto/reparto-detail.component';

import { VehiculoListComponent } from "./vehiculo/vehiculo-list.component";
import { VehiculoAddComponent } from "./vehiculo/vehiculo-add.component";
//import { VehiculoDetailComponent } from './vehiculo/vehiculo-detail.component';
import { AuthGuard } from './login/guardas/AuthGuard';

import { VentaListComponent } from "./venta/ventas-list.component";
import { VentaAddComponent } from "./venta/venta-add.component";
//import { VehiculoDetailComponent } from './vehiculo/vehiculo-detail.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: "",
  component: HomeComponent,
  canActivate:[AuthGuard],
	canActivateChild:[AuthGuard],
    children: [
      //{path: '', component: HomeComponent },
      { path: "usuarios", component: UsuariosListComponent },
      { path: "usuarios/:id", component: UsuarioDetailComponent },
      { path: "usuario-edit/:id", component: UsuarioAddComponent },
      { path: "usuario-add", component: UsuarioAddComponent },

      { path: "roles", component: RolesListComponent },
      { path: "roles/:id", component: RolDetailComponent },
      { path: "rol-edit/:id", component: RolAddComponent },
      { path: "rol-add", component: RolAddComponent },

      { path: "productos", component: ProductosListComponent },
      { path: "productos/:id", component: ProductoDetailComponent },
      { path: "producto-edit/:id", component: ProductoAddComponent },
      { path: "producto-add", component: ProductoAddComponent },

      { path: "clientes", component: ClientesListComponent },
      { path: "clientes/:id", component: ClienteDetailComponent },
      { path: "cliente-edit/:id", component: ClienteAddComponent },
      { path: "cliente-add", component: ClienteAddComponent },

      { path: "envases", component: EnvasesListComponent },
      { path: "envases/:id", component: EnvaseDetailComponent },
      { path: "envase-add", component: EnvaseAddComponent },
      { path: "envase-edit/:id", component: EnvaseEditComponent },

      { path: "listaprecios", component: ListaPreciosListComponent },
      { path: "listaprecios/:id", component: ListaPrecioDetailComponent },
      { path: "listaprecio-edit/:id", component: ListaPrecioAddComponent },
      { path: "listaprecio-add", component: ListaPrecioAddComponent },

      { path: "stock", component: StockListComponent },
      { path: "stock/:id", component: StockDetailComponent },
      { path: "stock-edit/:id", component: StockAddComponent },
      { path: "stock-add", component: StockAddComponent },

      { path: "fabrica", component: FabricaListComponent },
      //{path: 'fabrica/:id', component: FabricaDetailComponent},
      { path: "fabrica-edit/:id", component: FabricaAddComponent },
      { path: "fabrica-add", component: FabricaAddComponent },

      { path: "ruta", component: RutaListComponent },
      //{path: 'ruta/:id', component: RutaDetailComponent},
      { path: "ruta-edit/:id", component: RutaAddComponent },
      { path: "ruta-add", component: RutaAddComponent },

      { path: "reparto", component: RepartoListComponent },
      //{path: 'reparto/:id', component: RepartoDetailComponent},
      { path: "reparto-edit/:id", component: RepartoAddComponent },
      { path: "reparto-add", component: RepartoAddComponent },

      { path: "vehiculo", component: VehiculoListComponent },
      //{path: 'vehiculo/:id', component: VehiculoDetailComponent},
      { path: "vehiculo-edit/:id", component: VehiculoAddComponent },
      { path: "vehiculo-add", component: VehiculoAddComponent },

      { path: "ventas", component: VentaListComponent },
      //{path: 'venta/:id', component: VehiculoDetailComponent},
      { path: "venta-edit/:id", component: VentaAddComponent },
      { path: "venta-add", component: VentaAddComponent },

      { path: "mapa", component: MapaComponent }
      //,{path: '**', component: ErrorComponent}
    ]
  },
  { path: "login", component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  enableTracing: false
});

//export const Routing = RouterModule.forRoot(appRoutes);
