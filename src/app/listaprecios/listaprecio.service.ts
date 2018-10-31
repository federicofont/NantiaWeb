import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { ListaPrecio} from './listaprecio.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class ListaPrecioService{
	public url:string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

	getListaPrecios(): Observable<any>{
	//return this._http.get(this.url+'listaprecios').map(res => res.json()); 
    return this._http.get(this.url+'listaprecio');
	}

	getListaPrecio(id:number){
		return this._http.get(this.url+'listaprecio/'+id); 
	}

	addListaPrecio(listaprecio:ListaPrecio){
		let body = JSON.stringify(listaprecio);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		////console.log(("body",body);

		return this._http.post(this.url+'listaprecio',body,{headers: headers});
	}

	//updateListaPrecio(listaprecio:ListaPrecio){
	//	let body = JSON.stringify(listaprecio);
	//	let headers = new HttpHeaders({'Content-Type':'application/json'});

	//	return this._http.put(this.url+'listaprecios/'+listaprecio.id,body,{headers: headers});
	//}

	editListaPrecio(id, listaprecio:ListaPrecio){
		let body = JSON.stringify(listaprecio);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.put(this.url+'listaprecio/'+listaprecio.id,body,{headers: headers});
	}

	deleteListaPrecio(id:number){
		return this._http.delete(this.url+'listaprecio/'+id); 
	}

	
}