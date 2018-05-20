import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Producto} from '../models/producto.model';
import { GLOBAL} from './global';

@Injectable()
export class ProductoService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getProductos(): Observable<any>{
	//return this._http.get(this.url+'productos').map(res => res.json()); 
    return this._http.get(this.url+'productos');
	}

	getProducto(id:number){
		return this._http.get(this.url+'productos/'+id); 
	}

	addProducto(producto:Producto){
		let body = JSON.stringify(producto);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'productos',body,{headers: headers});
	}

	updateProducto(producto:Producto){
		let body = JSON.stringify(producto);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'productos/'+producto.id,body,{headers: headers});
	}

	
}