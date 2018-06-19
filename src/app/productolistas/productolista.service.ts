import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { ProductoLista} from './productolista.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class ProductoListaService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getProductoListas(): Observable<any>{
	//return this._http.get(this.url+'productolistas').map(res => res.json()); 
    return this._http.get(this.url+'productolistas');
	}

	getProductoLista(id:number){
		return this._http.get(this.url+'productolistas/'+id); 
	}

	addProductoLista(productolista:ProductoLista){
		let body = JSON.stringify(productolista);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'productolistas',body,{headers: headers});
	}

	//updateProductoLista(productolista:ProductoLista){
	//	let body = JSON.stringify(productolista);
	//	let headers = new Headers({'Content-Type':'application/json'});

	//	return this._http.put(this.url+'productolistas/'+productolista.id,body,{headers: headers});
	//}

	editProductoLista(id, productolista:ProductoLista){
		let body = JSON.stringify(productolista);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'productolistas/'+productolista.id,body,{headers: headers});
	}

	deleteProductoLista(id:number){
		return this._http.delete(this.url+'productolistas/'+id); 
	}

	
}