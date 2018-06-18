import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Envase } from './envase.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class EnvaseService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getEnvases(): Observable<any>{
	//return this._http.get(this.url+'envasesTipo').map(res => res.json()); 
    return this._http.get(this.url+'envasesTipo');
	}

	getEnvase(id:number){
		return this._http.get(this.url+'envasesTipo/'+id); 
	}

	addEnvase(envase:Envase){
		let body = JSON.stringify(envase);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'envasesTipo',body,{headers: headers});
	}

	editEnvase(id, envase:Envase){
		let body = JSON.stringify(envase);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'envasesTipo/'+envase.id,body,{headers: headers});
	}

	deleteEnvase(id:number){
		return this._http.delete(this.url+'envasesTipo/'+id); 
	}

	
}