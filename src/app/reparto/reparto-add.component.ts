
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { RepartoService } from './reparto.service';
import { Reparto } from './reparto.model';

import { Usuario } from '../usuarios/usuario.model'
import { UsuarioService } from '../usuarios/usuario.service'

import { VehiculoService } from '../vehiculo/vehiculo.service';
import { Vehiculo } from '../vehiculo/vehiculo.model';

import { FabricaService } from '../fabrica/fabrica.service';
import { Fabrica } from '../fabrica/fabrica.model';

import { RutaService } from '../ruta/ruta.service';
import { Ruta } from '../ruta/ruta.model';

import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/stock.model';

import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto.model';

import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';

import { ProductoStock } from '../stock/productostock.model';
import { EnvaseStock } from '../stock/envasestock.model';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { Fecha } from '../fecha';

@Component ({
	selector: 'formRepartoAdd',
	templateUrl: '../reparto/reparto-add.html',
	providers: [RepartoService, VehiculoService, UsuarioService, FabricaService,
				RutaService, StockService, ProductoService, EnvaseService, Fecha],
    styleUrls: ['./reparto.style.css']
})

export class RepartoAddComponent{
	public titulo: string;
	
	reparto = new Reparto();
	producto= new Producto();
	envasesTipos = new Envase();
	ruta = new Ruta();

	productoStock : ProductoStock = new ProductoStock ;
	envaseStock : EnvaseStock = new EnvaseStock ;
	setProductoStock : ProductoStock[] = [];
	setEnvaseStock : EnvaseStock[] = [];

	usuarios : Usuario[] = [];
	fabricas : Fabrica[] = [];
	vehiculos : Vehiculo[] = [];
	rutas : Ruta[] = [];
	productos : Producto[] = [];
	envases : Envase[] = [];

	stock : Stock = new Stock();

	result : any;

	nuevo:boolean=false;
	id:number;

	constructor(private _repartoService: RepartoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _usuarioService: UsuarioService,
				private _vehiculoService: VehiculoService,
				private _fabricaService : FabricaService,
				private _rutaService: RutaService,
				private _stockService: StockService,
				private _productoService: ProductoService,
				private _envaseService: EnvaseService,
				private _fecha: Fecha
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){

		if(this.id != null){
			this.getDatos();
			this.titulo = 'Editar Reparto';
		}else{
			this.titulo = 'Nuevo Reparto';
			this.getDatos();
		}




	}


	getReparto(id:number){
		this._repartoService.getReparto(id).subscribe(
				(result : any) =>{
					if (result.id > 0) {
						 this.reparto = result;
						 console.log(this.reparto);
						 if (this.reparto) 
						 	this.getStock(this.reparto.stock.id);
					}else{
						//console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.logerror);
				}
			)
	}

		getStock(id:number){
		this._stockService.getStock(id).subscribe(
				(result:any) =>{
					if(result.id > 0){
						this.reparto.stock = result;
						//console.log("reparto", this.reparto);
					}else{
						////console.log(("ID:",id," Result Controler:",result.status);
					}
				},
				error =>{
					//console.logerror);
				}
			)
	}


	getDatos() {
		let a1 = this._usuarioService.getUsuarios();
		let a2 = this._vehiculoService.getVehiculos();
		let a3 = this._fabricaService.getFabricas();
		let a4 = this._rutaService.getRutas();
		let a5 = this._productoService.getProductos();
		let a6 = this._envaseService.getEnvases();

		forkJoin([a1, a2, a3, a4, a5, a6]).subscribe(result => {
				if (result[0]) {
				   	this.usuarios = result[0];
                }else{
                	//console.log("Result Controler",result.status);   
                }

                if (result[1]) {
                     this.vehiculos = result[1];
                }else{
                    //console.log("Result Controler",result.status); 
                }

				if (result[2]) {
					this.fabricas = result[2];
				}else{
					//console.log("Result Controler:",result.status);
				}

                if (result[3]) {
                     this.rutas = result[3];
                }else{
                    //console.log("Result Controler",result.status); 
                }

				if (result[4]) {
					 this.productos=result[4];
					 this.stockProductos();
					 //this.reparto.stock.setProductoStock = this.setProductoStock; 
				}else{
					//console.log("Result Controler",result.status); 
				}

				if (result[5]) {
					this.envases=result[5];
					this.stockenvases();
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.logerror);
			}
		);
	}

	stockProductos(){
	 	if(this.id){
	 		this.getReparto(this.id);
	 	}else{
			 for (var i = this.productos.length - 1; i >= 0; i--) {
			 	var productoStock = new ProductoStock();
			 		
			 		productoStock.cantidad=0;
			 		productoStock.fecha= this._fecha.getDate();;
			 		//productoStock.id=i;
			 		productoStock.producto=this.productos[i];

			 	this.setProductoStock.push(productoStock);
			 	this.reparto.stock.setProductoStock.push(productoStock)
			 }
		}

	}

	stockenvases(){
	 	if(this.id){
			this.getReparto(this.id);
	 	}else{
				for (var i = this.envases.length - 1; i >= 0; i--) {
				 	var envaseStock = new EnvaseStock();
				 		
				 		envaseStock.cantidad=0;
				 		envaseStock.fecha=this._fecha.getDate();;
				 		//envaseStock.id=i;
				 		envaseStock.envasesTipos=this.envases[i];

				 	this.setEnvaseStock.push(envaseStock);
				 	this.reparto.stock.setEnvaseStock.push(envaseStock);
				 }
			}
	}


	guardar(formAdd:NgForm){
		if (this.id==null) {
			// Add user
			this.reparto.fecha = this._fecha.getDate();
			this.reparto.estado = 'CREADO';
			this.reparto.fabricaid = this.fabricas[0].id;
			this.reparto.stock.fecha = this._fecha.getDate();

			console.log("Create Reparto:",this.reparto);
		
			this._repartoService.addReparto(this.reparto)
				.subscribe((result : any) => {
 					if(result.id > 0){
 						this._router.navigate(['/reparto']);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		}else{
 			// Update user
			this.reparto.id=this.id;
			this.reparto.fecha = this._fecha.getDate();
			this.reparto.estado = 'CREADO';
			this.reparto.fabricaid = this.fabricas[0].id;
			this.reparto.stock.fecha = this._fecha.getDate();
			console.log("Update Reparto:",this.reparto);
		
			this._repartoService.editReparto(this.reparto.id, this.reparto)
			 	.subscribe((result : any) => {
					if(result.id > 0){
 		 				this._router.navigate(['/reparto']);
 		 			}else{
 		 				//console.log("Result Controler",result.status);
			 		}
 		 		},
 		 		error => {
 		 			//console.log(<any>error);
 		 		})
 		 }

	}



}