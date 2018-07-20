import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListaPrecioService } from './listaprecio.service';
import { ListaPrecio} from './listaprecio.model';

@Component({
	selector: 'listaprecios-list',
	templateUrl: '../listaprecios/listaprecios-list.html',
	providers: [ListaPrecioService]
})
export class ListaPreciosListComponent{
	public titulo: string;
	public listaprecio:ListaPrecio;
	public listaprecios: ListaPrecio[];
	public confirmado;
	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _listaprecioService: ListaPrecioService
	){
		this.titulo = 'Listado de precios';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		//console.log('ListaPrecios-list.compoent.ts cargado');
		//alert(this._listaprecioService.getListaPrecios());
		if (this.id==null) {
			//console.log("pase el if");
			this.getListaPrecios();
			//console.log("lista Precio: ",this.listaprecio)
		}else{
			//console.log("Entre al else")
			this.getListaPrecio()
			//console.log("listaprecios: ",this.listaprecios)
		}
}
		getListaPrecios(){
			this._listaprecioService.getListaPrecios().subscribe(
				result =>{
					if(result.status == 200){
						 this.listaprecios = result.json();
					}else{
						//console.log("Result Controler",result.status); 
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		getListaPrecio(){
			this._listaprecioService.getListaPrecio(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.listaprecio = result.json();
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

		onDeleteListaPrecio(id){
			this._listaprecioService.deleteListaPrecio(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getListaPrecios();
					}else{
						alert("Error al borrar listaprecio")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}