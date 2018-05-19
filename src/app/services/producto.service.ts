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

	getProductos(){
		return this._http.get(this.url+'usuarios').map(res => res.json()); 
	}
}