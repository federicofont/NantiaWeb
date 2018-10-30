import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ListaPrecioService } from './listaprecio.service';
import { ListaPrecio } from './listaprecio.model';

import { ProductoLista } from './productolista.model';

@Component ({
	selector: 'listaprecio-detail',
	templateUrl: './listaprecio-detail.html',
	providers: [ListaPrecioService],
	styleUrls: ['./listaprecio.style.css']
})

export class ListaPrecioDetailComponent{
	public titulo: string;
	listaprecio: ListaPrecio = new ListaPrecio();
	public id:number;

	productoLista: ProductoLista = new ProductoLista();
	productosLista:ProductoLista[] = [];

	constructor(private _listaprecioService: ListaPrecioService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'ListaPrecio';

		this._activatedRoute.params
			.subscribe( parametros=>{
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		////console.log(('listaprecio-detail.component.ts cargado');

		this.getListaPrecio();

	}


	getListaPrecio(){
		this._listaprecioService.getListaPrecio(this.id).subscribe(
				(result:ListaPrecio) =>{
					//if (result.length > 0) {
					if(result){
						////console.log(("Result:",result.json());
						 this.listaprecio = result;//.json();
						 //console.logthis.listaprecio);
						 this.getProductosLista();
					}else{
						////console.log(("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			)
	}

	getProductosLista(){
		this.productosLista=this.listaprecio.setProductoLista;
		//console.log("productosLista:",this.productosLista);
	}


	}
