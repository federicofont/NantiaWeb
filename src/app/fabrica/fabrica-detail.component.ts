import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { FabricaService } from './fabrica.service';
import { Fabrica } from './fabrica.model';

import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/stock.model';

import { ProductoStock } from '../stock/productostock.model';
import { EnvaseStock } from '../stock/envasestock.model';

import { Producto } from '../productos/producto.model';
import { ProductoService } from '../productos/producto.service';

import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';

import { Fecha } from '../fecha';

//import { ProductoListaService } from '../productolistas/productolista.service';

@Component ({
	selector: 'formFabricaDetail',
	templateUrl: './fabrica-detail.html',
	providers: [FabricaService,StockService,ProductoService,EnvaseService, Fecha],
	styles: ['fabrica.style.css']
})

export class FabricaDetailComponent{
	
	public titulo: string;
	public fechaActual :Date = new Date();

	nuevo:boolean=false;
	id:number;
	
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	fabrica : Fabrica = new Fabrica();
	stock : Stock = new Stock();
	productoStock : ProductoStock = new ProductoStock ;
	envaseStock : EnvaseStock = new EnvaseStock ;
	
	setProductoStock : ProductoStock[] = [];
	setEnvaseStock : EnvaseStock[] = [];

	producto : Producto = new Producto();
	productos : Producto [] = [];
	envase: Envase = new Envase();
	envases:Envase[] = [];
	

	constructor(private _fabricaService: FabricaService,
				private _stockService: StockService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _productoService: ProductoService,
				private _envaseService: EnvaseService,
				private _fecha:Fecha
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Fabrica'
		}else{
			this.titulo = 'Nuevo Fabrica';	
		} 
		

	}
	 

	ngOnInit(){
		
		if(this.id != null){
			this.getFabrica(this.id);

		}else{
		  //this.fabrica.stock = this.stock;
		  //this.fabrica.stock.setProductoStock=this.setProductoStock;
		  this.getProductos();
		  this.getEnvases();
		}

	}


	getFabrica(id:number){
		this._fabricaService.getFabrica(id).subscribe(
				(result : any) =>{
					if (result.id > 0) {
						 this.fabrica = result;
						 this.setEnvaseStock=this.fabrica.stock.setEnvaseStock;
						 this.setProductoStock= this.fabrica.stock.setProductoStock;
					}else{
						//console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.logerror);
				}
			)
	}


	getProductos(){
		//console.log("entre getProductos");
		this._productoService.getProductos().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					 this.productos=result;

					 for (var i = this.productos.length - 1; i >= 0; i--) {
					 	var productoStock = new ProductoStock();
					 		
					 		productoStock.cantidad=0;
					 		productoStock.fecha=this._fecha.getDate();
					 		//productoStock.id=i;
					 		productoStock.producto=this.productos[i];

					 	this.setProductoStock[i] = productoStock;
					 }
					 //this.fabrica.stock=this.stock;
					 this.fabrica.stock.setProductoStock = this.setProductoStock;
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.logerror);
			}
		);
	}

	getEnvases(){
		this._envaseService.getEnvases().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					this.envases=result;

					for (var i = this.envases.length - 1; i >= 0; i--) {
					 	var envaseStock = new EnvaseStock();
					 		
					 		envaseStock.cantidad=0;
					 		envaseStock.fecha=this._fecha.getDate();;
					 		//envaseStock.id=i;
					 		envaseStock.envasesTipos=this.envases[i];

					 	this.setEnvaseStock[i] = envaseStock;
					 }

					 this.fabrica.stock.setEnvaseStock = this.setEnvaseStock;

				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.logerror);
			}
		);
	}




}