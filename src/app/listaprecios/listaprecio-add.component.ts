import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ListaPrecioService } from './listaprecio.service';
import { ListaPrecio } from './listaprecio.model';

import { Producto } from '../productos/producto.model';
import { ProductoService } from '../productos/producto.service';

import { ProductoLista } from './productolista.model';
//import { ProductoListaService } from '../productolistas/productolista.service';

import { Fecha } from '../fecha';

@Component({
	selector: 'formListaPrecioAdd',
	templateUrl: './listaprecio-add.html',
	providers: [ListaPrecioService, ProductoService, Fecha],
	styleUrls: ['./listaprecio.style.css']
})

export class ListaPrecioAddComponent {

	public titulo: string;
	public fechaActual: Date = new Date();

	nuevo: boolean = false;
	id: number;

	/*Creo los objetos que voy a referenciar y editar en el HTML*/
	listaprecio: ListaPrecio = new ListaPrecio();
	producto: Producto = new Producto();
	productos: Producto[] = [];
	productoLista: ProductoLista = new ProductoLista();
	productosLista: ProductoLista[] = [];

	constructor(private _listaprecioService: ListaPrecioService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _productoService: ProductoService,
		private _Fecha: Fecha
	) {

		this._activatedRoute.params
			.subscribe(parametros => {
				////console.log(("id",parametros.id);
				this.id = parametros['id'];
			})


		if (this.id != null) {
			this.titulo = 'Editar Lista Precio'
		} else {
			this.titulo = 'Nuevo Lista Precio';
		}


	}


	ngOnInit() {
		////console.log(('listaprecio-add.component.ts cargado');	

		if (this.id != null) {
			this.getListaPrecio(this.id);
		}


		this.productosLista = [];
		this.getProductos();
	}


	getListaPrecio(id:number) {
		////console.log(("entre al getlistaprecio");
		this._listaprecioService.getListaPrecio(id).subscribe(
			(result: ListaPrecio) => {
				////console.log(("status:",result.status);
				if (result.id > 0) {
					this.listaprecio = result;//.json();
					this.productosLista = this.listaprecio.setProductoLista;

					////console.log(("listaprecio:",this.listaprecio);
					////console.log(("productosLista:",this.productosLista);

				} else {
					////console.log(("ID:",this.id," Result Controler:",result.status);
				}

			},
			error => {
				//console.logerror);
			}
		)
	}

	getProductosLista() {
		//this.productosLista;
		////console.log(("productosLista:",this.productosLista);
	}

	getProductos() {
		this._productoService.getProductos().subscribe(
			(result : any) =>{
				if (result.length > 0) {
					this.productos = result;
					////console.logresult.json());
				} else {
				//	//console.log("Result Controler", result.status);
				}
			},
			error => {
				//console.logerror);
			}
		);
	}

	guardar(formlistaAdd: NgForm) {

		this.listaprecio.setProductoLista = this.productosLista;
		this.listaprecio.fechaAlta = this._Fecha.getDate();
		////console.logthis.listaprecio.fechaAlta);
		////console.log(("this.listaprecio",this.listaprecio);
		if (this.id != null) {
			this.listaprecio.id = this.id;
			this.updateListaPrecio();
		}
		else {
			this.addListaPrecio();
		}

	}


	updateListaPrecio() {
		////console.log(("update:",this.listaprecio);
		this._listaprecioService.editListaPrecio(this.id, this.listaprecio)
			.subscribe((result:ListaPrecio) => {
				if (result.id > 0) {
					////console.log(("Result Controler",result.status);
					this._router.navigate(['/listaprecios']);
				} else {
					//204 -- No Content
					////console.log(("Result Controler",result.status);
				}
			},
				error => {
					//console.logerror);
				})
	};

	addListaPrecio() {
		//Llamo al servicio que creara el nuevo listaprecio
		////console.log(("this.listaprecio",this.listaprecio);
		this._listaprecioService.addListaPrecio(this.listaprecio)
			.subscribe((result:ListaPrecio) => {
				//if (result.status == 201) {
				if(result.id>0){
					////console.log(("Result Controler", result.status);
					this._router.navigate(['/listaprecios']);
				} else {
					////console.log(("Result Controler", result.status);
				}
			},
				error => {
					//console.logerror);
				})
	};


	addProductoLista(formproductosAdd: NgForm) {
		//Cargo el objeto envase y el arreglo envases
		////console.log(("Conectado a addProductoLista");
		var ind: number = 0;
		////console.logformproductosAdd);
		var idProducto: number = formproductosAdd.controls['productoId'].value;
		////console.log(("this.envases",this.envases);
		for (var i = this.productos.length - 1; i >= 0; i--) {
			if (this.productos[i].productoId == idProducto)
				ind = i;
			//else
			////console.log(("i",i);
		}

		const nuevo_productoLista = new ProductoLista(null,
			formproductosAdd.controls['precio'].value,
			this._Fecha.getDate(),
			this.productos[ind]);

		////console.log(("nuevo_envaseEnprestamo",nuevo_envaseEnprestamo);
		this.productosLista.push(nuevo_productoLista);
		//this.getProductosLista();
	}




}