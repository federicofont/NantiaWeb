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
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){

		if(this.id != null){
			this.getReparto(this.id);
			this.titulo = 'Editar Reparto';
		}else{
			this.titulo = 'Nuevo Reparto';
		}

	  	this.getUsuarios();
		this.getVehiculos();
		this.getFabricas();
		this.getRutas();
		this.getProductos();
		this.getEnvases();


	}


	getReparto(id:number){
		this._repartoService.getReparto(id).subscribe(
				result =>{
					if(result.status == 200){
						 this.reparto = result.json();
						 this.getStock(this.reparto.stock.id);
					}else{
						console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(error);
				}
			)
	}

	getUsuarios(){
		this._usuarioService.getUsuarios().subscribe(
            result => {
                if(result.status == 200){
                	this.usuarios = result.json();
                }else{
                	console.log("Result Controler",result.status);   
                }
        	 },
            error => {
                console.log(<any>error);
            }
        );

	}

    getVehiculos(){
        this._vehiculoService.getVehiculos().subscribe(
            result =>{
                if(result.status == 200){
                     this.vehiculos = result.json();
                }else{
                    console.log("Result Controler",result.status); 
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

	getFabricas(){
		this._fabricaService.getFabricas().subscribe(
				result =>{
					if(result.status == 200){
						 this.fabricas = result.json();
					}else{
						console.log("Result Controler:",result.status);
					}
				},
				error =>{
					console.log(error);
				}
			)
	}

    getRutas(){
        this._rutaService.getRutas().subscribe(
            result =>{
                if(result.status == 200){
                     this.rutas = result.json();
                }else{
                    console.log("Result Controler",result.status); 
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

	getProductos(){
		this._productoService.getProductos().subscribe(
			result =>{
				if(result.status == 200){
					 this.productos=result.json();

					 for (var i = this.productos.length - 1; i >= 0; i--) {
					 	var productoStock = new ProductoStock();
					 		
					 		productoStock.cantidad=0;
					 		productoStock.fecha= this._fecha.getDate();;
					 		//productoStock.id=i;
					 		productoStock.producto=this.productos[i];

					 	this.setProductoStock[i] = productoStock;
					 }

					 this.reparto.stock.setProductoStock = this.setProductoStock;
					 
				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(error);
			}
		);
	}

	getEnvases(){
		this._envaseService.getEnvases().subscribe(
			result =>{
				if(result.status == 200){
					this.envases=result.json();

					for (var i = this.envases.length - 1; i >= 0; i--) {
					 	var envaseStock = new EnvaseStock();
					 		
					 		envaseStock.cantidad=0;
					 		envaseStock.fecha=this._fecha.getDate();;
					 		//envaseStock.id=i;
					 		envaseStock.envasesTipos=this.envases[i];

					 	this.setEnvaseStock[i] = envaseStock;
					 }

					 this.reparto.stock.setEnvaseStock = this.setEnvaseStock;

				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(error);
			}
		);
	}

	guardar(formAdd:NgForm){
		if (this.id==null) {
			// Add user
			this.reparto.fecha = this._fecha.getDate();
			this.reparto.estado = 'CREADO';
			this.reparto.fabricaid = this.fabricas[1].id;
			this.reparto.stock.fecha = this._fecha.getDate();
			console.log("Create Reparto:",this.reparto);
		
			this._repartoService.addReparto(this.reparto)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/repartos/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		}else{
 			// Update user
			this.reparto.id=this.id;
			this.reparto.fecha = this._fecha.getDate();
			this.reparto.estado = 'CREADO';
			this.reparto.fabricaid = this.fabricas[1].id;
			this.reparto.stock.fecha = this._fecha.getDate();
			console.log("Update Reparto:",this.reparto);
		
			this._repartoService.editReparto(this.reparto.id, this.reparto)
			 	.subscribe(result => {
					if(result.status==200){
 		 				this._router.navigate(['/repartos/'+result.json().id]);
 		 			}else{
 		 				console.log("Result Controler",result.status);
			 		}
 		 		},
 		 		error => {
 		 			console.log(<any>error);
 		 		})
 		 }

	}

	getStock(id:number){
		this._stockService.getStock(id).subscribe(
				result =>{
					if(result.status == 200){
						this.reparto.stock = result.json();
						console.log("reparto", this.reparto);
					}else{
						console.log("ID:",id," Result Controler:",result.status);
					}
				},
				error =>{
					console.log(error);
				}
			)
	}


}