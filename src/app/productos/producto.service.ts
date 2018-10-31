import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Producto} from './producto.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class ProductoService{
	public url:string;

	constructor(
		public _http: HttpClient
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
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'productos',body,{headers: headers});
	}

	editProducto(id, producto:Producto){
		let body = JSON.stringify(producto);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.put(this.url+'productos/'+producto.productoId,body,{headers: headers});
	}

	deleteProducto(id:number){
		return this._http.delete(this.url+'productos/'+id); 
	}

	
}