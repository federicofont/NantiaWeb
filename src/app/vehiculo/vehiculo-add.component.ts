import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.model';

import { ProductoStock } from '../stock/productostock.model';
import { EnvaseStock } from '../stock/envasestock.model';

import { Producto } from '../productos/producto.model';
import { ProductoService } from '../productos/producto.service';

import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';

import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/stock.model';

@Component ({
	selector: 'formVehiculoAdd',
	templateUrl: '../vehiculo/vehiculo-add.html',
	providers: [VehiculoService,ProductoService,EnvaseService,StockService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class VehiculoAddComponent{
	
	public titulo: string;
	public fechaActual :Date = new Date();
	
	vehiculo = new Vehiculo();

	stock : Stock = new Stock();
	productoStock : ProductoStock = new ProductoStock ;
	envaseStock : EnvaseStock = new EnvaseStock ;

	setProductoStock : ProductoStock[] = [];
	setEnvaseStock : EnvaseStock[] = [];

	producto : Producto = new Producto();
	productos : Producto [] = [];
	envase: Envase = new Envase();
	envases:Envase[] = [];

	nuevo:boolean=false;
	id:number;

	constructor(private _vehiculoService: VehiculoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _productoService: ProductoService,
				private _envaseService: EnvaseService,
				private _stockService: StockService){

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Vehiculo'
		}else{
			this.titulo = 'Nuevo Vehiculo';	
		}

	}
	 

	ngOnInit(){
		if(this.id != null){
			this.getVehiculo(this.id);
		}else{
		  this.getProductos();
		  this.getEnvases();
		  console.log("Stock:", this.vehiculo);
		}
	}


	getVehiculo(id:number){
		this._vehiculoService.getVehiculo(id).subscribe(
				result =>{
					if(result.status == 200){
						 this.vehiculo = result.json();
						 console.log("Result stock:",this.vehiculo);
						 console.log("result.json():",result.json());

					}else{
						console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(error);
				}
			)
	}


	getProductos(){
		this._productoService.getProductos().subscribe(
			result =>{
				if(result.status == 200){
					 this.productos=result.json();

					 for (var i = this.productos.length - 1; i >= 0; i--) {
					 	var productoStock = new ProductoStock();
					 		
					 		productoStock.cantidad=0;
					 		productoStock.fecha=this.fechaActual;
					 		//productoStock.id=i;
					 		productoStock.producto=this.productos[i];

					 	this.setProductoStock[i] = productoStock;
					 }

					 this.stock.setProductoStock = this.setProductoStock;
					 
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
					 		envaseStock.fecha=this.fechaActual;
					 		//envaseStock.id=i;
					 		envaseStock.envasesTipos=this.envases[i];

					 	this.setEnvaseStock[i] = envaseStock;
					 }

					 this.stock.setEnvaseStock = this.setEnvaseStock;

				}else{
					console.log("Result Controler",result.status); 
				}
			},
			error =>{
				console.log(error);
			}
		);
	}


	guardar(vehiculoAdd:NgForm){
		//console.log("vehiculo ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el vehiculo desde el formulario
			this.vehiculo=vehiculoAdd.value;
			//console.log("Vehiculo:",this.vehiculo);
		
			this._vehiculoService.addVehiculo(this.vehiculo)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/vehiculos/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el vehiculo desde el formulario
			// this.vehiculo=vehiculoAdd.value;
			// this.vehiculo.id=this.id;
			// //console.log("vehiculo:",this.vehiculo);
		
			// this._vehiculoService.updateVehiculo(this.vehiculo)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/vehiculos/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				//console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			//console.log(<any>error);
 		// 		})
 		// }

	}
}