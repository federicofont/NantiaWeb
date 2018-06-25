import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ProductoService } from './producto.service';
import { Producto } from './producto.model';

@Component ({
	selector: 'formProducto-edit',
	templateUrl: '../productos/producto-add.html',
	providers: [ProductoService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class ProductoEditComponent{
	public titulo: string;
	public is_edit;

producto: Producto = {
	id: null,
	nombre: null,
	presentacion: null,
	descripcion: null,
	retornable: null
}
	id:number;

	constructor(private _productoService: ProductoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Editar Producto';
		this.is_edit = true;

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('producto-add.component.ts cargado');
		this.getProducto();
	}

	getProducto(){
	this._productoService.getProducto(this.id).subscribe(
				result =>{
					if(result.status == 200){
						//console.log("Result:",result.json());
						 this.producto = result.json();
					}else{
						//console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			)
	};

	guardar(productoAdd:NgForm){
		this.updateProducto();
	}

	updateProducto(){
		this._productoService.editProducto(this.id, this.producto)
				.subscribe(result => {
				//console.log("Result Controler",result.status);
 					if(result.status==200){
 						this._router.navigate(['/productos/'+result.json().id]);
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