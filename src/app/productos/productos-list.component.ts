import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from './producto.service';
import { Producto} from './producto.model';

@Component({
	selector: 'productos-list',
	templateUrl: './productos-list.html',
	providers: [ProductoService]
})
export class ProductosListComponent{
	public titulo: string;
	public producto:Producto;
	public productos: Producto[];
	public confirmado;
	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
	){
		this.titulo = 'Listado de productos';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		//console.log('Productos-list.compoent.ts cargado');
		//alert(this._productoService.getProductos());
		if (this.id==null) {
			//console.log("pase el if");
			this.getProductos();
		}else{
			//console.log("Entre al else")
			this.getProducto();
			
		}

	}

		getProductos(){
			this._productoService.getProductos().subscribe(
				result =>{
					if(result.status == 200){
						 this.productos = result.json();
						 console.log("result.status:", result.status);
					}else{
						console.log("Result Controler",result.status); 
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		getProducto(){
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