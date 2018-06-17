import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto} from '../models/producto.model';

@Component({
	selector: 'productos-list',
	templateUrl: '../productos/productos-list.html',
	providers: [ProductoService]
})
export class ProductosListComponent{
	public titulo: string;
	public producto:Producto;
	public productos: Producto[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
	){
		this.titulo = 'Listado de productos';
		this._activatedRoute.params
			.subscribe( parametros=>{
			console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		console.log('Productos-list.compoent.ts cargado');
		//alert(this._productoService.getProductos());
		if (this.id==null) {
			console.log("pase el if");
			this.getProductos();
		}else{
			console.log("Entre al else")
			this._productoService.getProducto(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.producto = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}
}
		getProductos(){
			this._productoService.getProductos().subscribe(
				result =>{
					if(result.status == 200){
						 this.productos = result.json();
					}else{
						console.log("Result Controler",result.status); 
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		public confirmado;

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDeleteProducto(id){
			this._productoService.deleteProducto(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getProductos();
					}else{
						alert("Error al borrar producto")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}