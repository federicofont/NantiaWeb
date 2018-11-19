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
	selector: 'formFabricaAdd',
	templateUrl: './fabrica-add.html',
	providers: [FabricaService,StockService,ProductoService,EnvaseService, Fecha],
	styles: ['fabrica.style.css']
})

export class FabricaAddComponent{
	
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

	guardar(formAdd:NgForm, formProductoAdd:NgForm,productoStock:ProductoStock){
		//console.log("formAdd",formAdd.value);
		//console.log("formProductoAdd",formProductoAdd.value);
		//console.log("productoStock",productoStock);

		
		this.stock.fecha=this._fecha.getDate();
		this.stock.setEnvaseStock=this.setEnvaseStock;
		this.stock.setProductoStock=this.setProductoStock;

		this.fabrica.stock = this.stock;
		if(this.id != null){
			this.fabrica.id=this.id;
			this.updateFabrica();
		} 
		else{
			this.addFabrica();
 		}
 		

	}

	updateFabrica(){
		this._fabricaService.editFabrica(this.id, this.fabrica)
				.subscribe((result : any) => {
 					if(result.id > 0){
 					//	//console.log("Result Controler",result.status);
 						this._router.navigate(['/fabrica']);
 					}else{
 						//204 -- No Content
 					//	//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.logerror);
 				})
	};

	addFabrica(){
		this._fabricaService.addFabrica(this.fabrica)
			.subscribe((result : any) => {
					if(result.id > 0){
						////console.log(("Result Controler",result.status);
						////console.log(("this.Fabrica",this.fabrica);
						this._router.navigate(['/fabrica/']);
					}else{
						////console.log(("Result Controler",result.status);
				}
				},
				error => {
					//console.logerror);
				})
	};


	addProducto(formProductoAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		////console.log(("Conectado a addProductoLista");
		var ind:number=0;
		//console.log("formProductoAdd:",formProductoAdd);
		var idProducto:number = formProductoAdd.controls['productoId'].value;
		////console.log(("this.envases",this.envases);
    	for (var i = this.setProductoStock.length - 1; i >= 0; i--) {
			if(this.setProductoStock[i].producto.productoId == idProducto)
				ind = i;
			//else
				////console.log(("i",i);
		}

		const nuevo_productoStock = new ProductoStock( null,
											formProductoAdd.controls['cantidad'].value,
											this._fecha.getDate(),
											this.setProductoStock[ ind ].producto);

		////console.log(("nuevo_productoStock",nuevo_productoStock);
		this.fabrica.stock.setProductoStock.push(nuevo_productoStock);
	}

	addEnvase(formEnvaseAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		////console.log(("Conectado a addProductoLista");
		var ind:number=0;
		//console.log("formEnvaseAdd:",formEnvaseAdd);
		var idEnvase:number = formEnvaseAdd.controls['envaseId'].value;
		////console.log(("this.envases",this.envases);
    	for (var i = this.setEnvaseStock.length - 1; i >= 0; i--) {
			if(this.setEnvaseStock[i].envasesTipos.id == idEnvase)
				ind = i;
			//else
				////console.log(("i",i);
		}

		const nuevo_envaseStock = new EnvaseStock( null,
											formEnvaseAdd.controls['cantidad'].value,
											this._fecha.getDate(),
											this.setEnvaseStock[ ind ].envasesTipos);

		//console.log("nuevo_productoStock",nuevo_envaseStock);
		this.fabrica.stock.setEnvaseStock.push(nuevo_envaseStock);
	}



}