import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Reparto } from './reparto.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class RepartoService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getRepartos(): Observable<any>{
	//return this._http.get(this.url+'repartosTipo').map(res => res.json()); 
    	return this._http.get(this.url+'reparto');
	}

	getReparto(id:number): Observable<any>{
		return this._http.get(this.url+'reparto/'+id); 
	}

	addReparto(reparto:Reparto){
		let body = JSON.stringify(reparto);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'datareparto',body,{headers: headers});
	}

	editReparto(id, reparto:Reparto){
		let body = JSON.stringify(reparto);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'datareparto/'+reparto.id,body,{headers: headers});
	}

	deleteReparto(id:number){
		return this._http.delete(this.url+'reparto/'+id); 
	}

	
}