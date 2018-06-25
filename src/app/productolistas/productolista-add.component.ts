import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ProductoListaService } from './productolista.service';
import { ProductoLista } from './productolista.model';

@Component ({
	selector: 'formProductoListaAdd',
	templateUrl: './productolista-add.html',
	providers: [ProductoListaService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ProductoListaAddComponent{
	
	public titulo: string;
	nuevo:boolean=false;
	id:number;
	
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	productolista : ProductoLista = new ProductoLista();
	
	constructor(private _productolistaService: ProductoListaService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar ProductoLista'
		}else{
			this.titulo = 'Nuevo ProductoLista';	
		} 
		

	}
	 

	ngOnInit(){
		//console.log('productolista-add.component.ts cargado');	
		if(this.id != null){
			this.getProductoLista();
		}

	}


	getProductoLista(){
	//console.log("entre al getproductolista");
	this._productolistaService.getProductoLista(this.id).subscribe(
				result =>{
					//console.log("status:",result.status);
					if(result.status == 200){
						 this.productolista = result.json();
						 
						//console.log("productolista:",this.productolista);

					}else{
						//console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			)
	}

	guardar(productolistaAdd:NgForm){

		if(this.id != null){
			this.updateProductoLista();
		} 
		else{
		//console.log("productolista ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//console.log(this.productolista);
			
			//Llamo al servicio que creara el nuevo productolista
			this._productolistaService.addProductoLista(this.productolista)
				.subscribe(result => {
 					if(result.status==201){
 						//console.log("Result Controler",result.status);
 						this._router.navigate(['/productolistas/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el productolista desde el formulario
			// this.productolista=productolistaAdd.value;
			// this.productolista.id=this.id;
			// //console.log("productolista:",this.productolista);
		
			// this._productolistaService.updateProductoLista(this.productolista)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/productolistas/'+result.json().id]);
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

	updateProductoLista(){
		//console.log("update:",this.productolista);
		this._productolistaService.editProductoLista(this.id, this.productolista)
				.subscribe(result => {
				//console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/productolistas/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
	};

}