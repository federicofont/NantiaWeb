import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoListaService } from './productolista.service';
import { ProductoLista} from './productolista.model';

@Component({
	selector: 'productolistas-list',
	templateUrl: './productolistas-list.html',
	providers: [ProductoListaService]
})
export class ProductoListasListComponent{
	public titulo: string;
	public productolista:ProductoLista;
	public productolistas: ProductoLista[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _productolistaService: ProductoListaService
	){
		this.titulo = 'Listado de productolistas';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		//console.log('ProductoListas-list.compoent.ts cargado');
		//alert(this._productolistaService.getProductoListas());
		if (this.id==null) {
			//console.log("pase el if");
			this.getProductoListas();
		}else{
			//console.log("Entre al else")
			this._productolistaService.getProductoLista(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.productolista = result.json();
					}else{
						//console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			);
		}
}
		getProductoListas(){
			this._productolistaService.getProductoListas().subscribe(
				result =>{
					if(result.status == 200){
						 this.productolistas = result.json();
					}else{
						//console.log("Result Controler",result.status); 
					}
				},
				error =>{
					//console.log(<any>error);
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

		onDeleteProductoLista(id){
			this._productolistaService.deleteProductoLista(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getProductoListas();
					}else{
						alert("Error al borrar productolista")
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

}