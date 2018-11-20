import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ProductoService } from './producto.service';
import { Producto } from './producto.model';
//import { Presentacion } from './presentacion.model';

import { Envase } from '../envases/envase.model'
import { EnvaseService } from '../envases/envase.service'

import { forkJoin } from 'rxjs/observable/forkJoin';


@Component ({
	selector: 'formProductoAdd',
	templateUrl: '../productos/producto-add.html',
	providers: [ProductoService, EnvaseService],
	styleUrls: ['./producto.style.css']
})

export class ProductoAddComponent{
	public titulo: string;
	
	producto: Producto = new Producto();
	envase: Envase = new Envase();
	envases: Envase[] =[];

	nuevo:boolean=false;
	id:number;

	constructor(private _productoService: ProductoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _envaseService:  EnvaseService){
		
		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Producto'
		}else{
			this.titulo = 'Nuevo Producto';	
		} 

	}
	 

	ngOnInit(){

		if(this.id != null){
			this.getProducto(this.id);
		}else{
			this.getEnvases();
		}

	}


	cargoEnvase(envase:number){
		//console.log(envase);
		this.getEnvase(envase);
	}

	getProducto(idprod:number){
		let a1 = this._productoService.getProducto(idprod);
		let a2 = this._envaseService.getEnvases();

		forkJoin([a1, a2]).subscribe(result => {
				if(result[0]){
					this.producto = result[0];
					//console.log("antes",this.producto, this.envase);
					if(this.producto)
						if(this.producto.envasesTipos){
							this.envase = this.producto.envasesTipos;
						}else{
							this.envase= new Envase();
						}

				}else{
					////console.log(("ID:",this.id," Result Controler:",result.status);
				}

				if(result[1]){
					this.envases = result[1];//.json();

				}else{
					////console.log(("ID:",this.id," Result Controler:",result.status);
				}
			},
			error =>{
				//console.log(<any>error);
			}
		)

	}

	getEnvases(){
		this._envaseService.getEnvases().subscribe(
			(result:any) =>{
				if(result){
					 this.envases = result;
				}else{
					////console.log(("ID:",this.id," Result Controler:",result.status);
				}
			},
			error =>{
				//console.log(<any>error);
			}
		)
	}

	getEnvase(id:number){
		this._envaseService.getEnvase(id).subscribe(
			(result:any) =>{
				if(result){
					 this.envase = result;
					 //console.log(this.envase);
				}else{
					////console.log(("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				//console.log(<any>error);
			}
		)
	}

	guardar(){
		
		if(this.id != null){
			//Llamo al servicio que actualiza el cliente
			this.producto.productoId=this.id;
			this.updateProducto();
		} 
		else{
			//Llamo al servicio que creara el nuevo cliente
			this.AddProducto();
		}

	}


	updateProducto(){
		//console.log("update:",this.producto);
		if (this.producto.envasesTipos){
			if(this.producto.envasesTipos.id === null){
				//console.log("Envase vacio",this.producto.envasesTipos);
				this.producto.envasesTipos =null;	
			}
		}else{
			if(this.envase){
				//console.log("Nuevo envase");
				this.producto.envasesTipos=this.envase;
			}else{
				//console.log("sin envase");
				this.producto.envasesTipos =null;	
			}

			
		}

		this._productoService.editProducto(this.id, this.producto)
				.subscribe((result : any) => {
				//////console.log("Result Controler",result.status);
 					if(result){
 						this._router.navigate(['/productos']);
 					}else{
 						//204 -- No Content
 						////console.log(("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
		}


	AddProducto(){	
		//console.log("add",this.producto)
		if(this.producto.envasesTipos.id === null){
			this.producto.envasesTipos = null;
		}
		this._productoService.addProducto(this.producto).subscribe(
			(result : any) =>{
				if(result){
					this._router.navigate(['/productos'/*/'+result.json().productoId*/]);
						////console.log(("Result Controler",result.status);
				}else{
					//	//console.log("Result Controler",result.status);
				}
			},
			error => {
				//console.log(<any>error);
				}
		)
	}

 		
}