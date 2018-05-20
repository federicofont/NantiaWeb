import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto} from '../models/producto.model';

@Component({
	selector: 'productos-list',
	templateUrl: '../views/productos-list.html',
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

}