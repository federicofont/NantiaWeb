import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ListaPrecioService } from './listaprecio.service';
import { ListaPrecio } from './listaprecio.model';

@Component ({
	selector: 'formListaPrecioAdd',
	templateUrl: './listaprecio-add.html',
	providers: [ListaPrecioService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ListaPrecioAddComponent{
	
	public titulo: string;
	nuevo:boolean=false;
	id:number;
	
	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	listaprecio : ListaPrecio = new ListaPrecio();
	
	constructor(private _listaprecioService: ListaPrecioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute
				){

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar ListaPrecio'
		}else{
			this.titulo = 'Nuevo ListaPrecio';	
		} 
		

	}
	 

	ngOnInit(){
		console.log('listaprecio-add.component.ts cargado');	
		if(this.id != null){
			this.getListaPrecio();
		}

	}


	getListaPrecio(){
	console.log("entre al getlistaprecio");
	this._listaprecioService.getListaPrecio(this.id).subscribe(
				result =>{
					console.log("status:",result.status);
					if(result.status == 200){
						 this.listaprecio = result.json();
						 
						console.log("listaprecio:",this.listaprecio);

					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			)
	}

	guardar(listaprecioAdd:NgForm){

		if(this.id != null){
			this.updateListaPrecio();
		} 
		else{
		console.log("listaprecio ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			console.log(this.listaprecio);
			
			//Llamo al servicio que creara el nuevo listaprecio
			this._listaprecioService.addListaPrecio(this.listaprecio)
				.subscribe(result => {
 					if(result.status==201){
 						console.log("Result Controler",result.status);
 						this._router.navigate(['/listaprecios/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el listaprecio desde el formulario
			// this.listaprecio=listaprecioAdd.value;
			// this.listaprecio.id=this.id;
			// console.log("listaprecio:",this.listaprecio);
		
			// this._listaprecioService.updateListaPrecio(this.listaprecio)
			// 	.subscribe(result => {
			// 	console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/listaprecios/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			console.log(<any>error);
 		// 		})
 		// }
 		}

	}

	updateListaPrecio(){
		console.log("update:",this.listaprecio);
		this._listaprecioService.editListaPrecio(this.id, this.listaprecio)
				.subscribe(result => {
				console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/listaprecios/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	};

}