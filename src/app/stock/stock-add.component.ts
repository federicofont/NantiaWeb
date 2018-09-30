import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { StockService } from './stock.service';
import { Stock } from './stock.model';

import { ProductoStock } from './productostock.model';
import { EnvaseStock } from './envasestock.model';

import { Producto } from '../productos/producto.model';
import { ProductoService } from '../productos/producto.service';

import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';

import { Fecha } from '../fecha';

//import { ProductoListaService } from '../productolistas/productolista.service';

@Component ({
	selector: 'formStockAdd',
	templateUrl: './stock-add.html',
	providers: [StockService,ProductoService,EnvaseService, Fecha],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class StockAddComponent{
	
	public titulo: string;

	nuevo:boolean=false;
	id:number;
	
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	stock : Stock = new Stock();
	productoStock : ProductoStock = new ProductoStock ;
	envaseStock : EnvaseStock = new EnvaseStock ;
	
	setProductoStock : ProductoStock[] = [];
	setEnvaseStock : EnvaseStock[] = [];

	producto : Producto = new Producto();
	productos : Producto [] = [];
	envase: Envase = new Envase();
	envases:Envase[] = [];
	
	constructor(private _stockService: StockService,
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
			this.titulo = 'Editar Stock'
		}else{
			this.titulo = 'Nuevo Stock';	
		} 
		

	}
	 

	ngOnInit(){
		
		if(this.id != null){
			this.getStock(this.id);
		}else{
		  this.getProductos();
		  this.getEnvases();
		  console.log("Stock:", this.stock);
		}

	}


	getStock(id:number){
		//console.log("entre al getstock");
		this._stockService.getStock(id).subscribe(
				result =>{
					//console.log("status:",result.status);
					if(result.status == 200){
						 this.stock = result.json();
						 console.log("Result stock:",this.stock);
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
					 		productoStock.fecha= this._fecha.getDate();;
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
					 		envaseStock.fecha=this._fecha.getDate();;
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

	guardar(formAdd:NgForm){

		console.log("Stock:", this.stock);
		this.stock.fecha = this._fecha.getDate();
		//console.log("this.stock",this.stock);
		if(this.id != null){
			this.stock.id=this.id;
			this.updateStock();
		} 
		else{
			this.addStock();
 		}

	}

	updateStock(){
		//console.log("update:",this.stock);
		this._stockService.editStock(this.id, this.stock)
				.subscribe(result => {
 					if(result.status == 200){
 						console.log("Result Controler",result.status);
 						this._router.navigate(['/stock/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(error);
 				})
	};

	addStock(){
		//Llamo al servicio que creara el nuevo stock
		//console.log("this.stock",this.stock);
		this._stockService.addStock(this.stock)
			.subscribe(result => {
					if(result.status==201){
						console.log("Result Controler",result.status);
						this._router.navigate(['/stock/'+result.json().id]);
					}else{
						console.log("Result Controler",result.status);
				}
				},
				error => {
					console.log(error);
				})
	};

/*
	addProductoLista(formproductosAdd:NgForm){	
		//Cargo el objeto envase y el arreglo envases
		//console.log("Conectado a addProductoLista");
		var ind:number=0;
		//console.log(formproductosAdd);
		var idProducto:number = formproductosAdd.controls['productoId'].value;
		//console.log("this.envases",this.envases);
    	for (var i = this.productos.length - 1; i >= 0; i--) {
			if(this.productos[i].productoId == idProducto)
				ind = i;
			//else
				//console.log("i",i);
		}

		const nuevo_productoLista = new ProductoLista( null,
											formproductosAdd.controls['precio'].value,
											null,
											this.productos[ ind ]);

		//console.log("nuevo_envaseEnprestamo",nuevo_envaseEnprestamo);
		this.productosLista.push(nuevo_productoLista);
		this.getProductosLista();
	}


*/

}