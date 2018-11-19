import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from './producto.service';
import { Producto} from './producto.model';

@Component({
	selector: 'productos-list',
	templateUrl: './productos-list.html',
	providers: [ProductoService],
	styleUrls: ['./producto.style.css']
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
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		////console.log(('Productos-list.compoent.ts cargado');
		//alert(this._productoService.getProductos());
		if (this.id==null) {
			////console.log(("pase el if");
			this.getProductos();
		}else{
			////console.log(("Entre al else")
			this.getProducto();
			
		}

	}

		getProductos(){
			this._productoService.getProductos().subscribe(
				(result : any) =>{
					if (result.length > 0) {
						 this.productos = result;
						// console.log(this.productos);
					}else{
				//		//console.log("Result Controler",result.status); 
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		getProducto(){
			this._productoService.getProducto(this.id).subscribe(
				(result:any) =>{
					if(result.productoId){
						 this.producto = result;
					}else{
						////console.log(("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDelete(id){
			this._productoService.deleteProducto(id).subscribe(
				(result:any) =>{
					if (result==null) {
						this.getProductos();
					}else{
						alert("Error al borrar producto")
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

}