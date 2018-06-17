import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component ({
	selector: 'formProductoAdd',
	templateUrl: '../productos/producto-add.html',
	providers: [ProductoService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ProductoAddComponent{
	public titulo: string;
	
producto: Producto = {
	id: null,
	nombre: null,
	presentacion: null,
	descripcion: null,
	retornable: null
}

	nuevo:boolean=false;
	id:number;

	constructor(private _productoService: ProductoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo Producto';

		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		console.log('producto-add.component.ts cargado');
	}

	guardar(productoAdd:NgForm){
		console.log("producto ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el producto desde el formulario
			this.producto=productoAdd.value;
			console.log("Producto:",this.producto);
		
			this._productoService.addProducto(this.producto)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/productos/'+result.json().id]);
 					}else{
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el producto desde el formulario
			// this.producto=productoAdd.value;
			// this.producto.id=this.id;
			// console.log("producto:",this.producto);
		
			// this._productoService.updateProducto(this.producto)
			// 	.subscribe(result => {
			// 	console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/productos/'+result.json().id]);
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