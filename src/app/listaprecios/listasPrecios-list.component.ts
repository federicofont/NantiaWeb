import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListaPrecioService } from './listaprecio.service';
import { ListaPrecio} from './listaprecio.model';

@Component({
	selector: 'listaprecios-list',
	templateUrl: '../listaprecios/listaprecios-list.html',
	providers: [ListaPrecioService],
	styleUrls: ['./listaprecio.style.css']
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
		this.titulo = 'Listas de precios';
		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		////console.log(('ListaPrecios-list.compoent.ts cargado');
		//alert(this._listaprecioService.getListaPrecios());
		if (this.id==null) {
			////console.log(("pase el if");
			this.getListaPrecios();
			////console.log(("lista Precio: ",this.listaprecio)
		}else{
			////console.log(("Entre al else")
			this.getListaPrecio(this.id);
		}
}
		getListaPrecios(){
			this._listaprecioService.getListaPrecios().subscribe(
				(result : any) =>{
					if (result.length > 0) {
						 this.listaprecios = result;
						 //console.log("listaprecios: ",this.listaprecios)
					}else{
						////console.log(("Result Controler",result.status); 
					}
				},
				error =>{
					////console.log((<any>error);
				}
			);
		}

		getListaPrecio(id:number){
			this._listaprecioService.getListaPrecio(id).subscribe(
				(result:ListaPrecio) =>{
					//if (result.length > 0) {
					if(result.id>0){	
						 this.listaprecio = result;//.json();
					}else{
					//	//console.log("ID:",this.id," Result Controler:",result.status);
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
			this._listaprecioService.deleteListaPrecio(id).subscribe(
				(result : any) =>{
					//if (result.length > 0) {
					if(result==null){
						this.getListaPrecios();
					}else{
						alert("Error al borrar listaprecio")
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

}