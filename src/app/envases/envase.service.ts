import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Envase } from './envase.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class EnvaseService{
	public url:string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

	getEnvases(): Observable<any>{
	//return this._http.get(this.url+'envasesTipo').map(res => res.json()); 
    	return this._http.get(this.url+'envasesTipo');
	}

	getEnvase(id:number): Observable<any>{
		return this._http.get(this.url+'envasesTipo/'+id); 
	}

	addEnvase(envase:Envase){
		let body = JSON.stringify(envase);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'envasesTipo',body,{headers: headers});
	}

	editEnvase(envase:Envase){
		let body = JSON.stringify(envase);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.put(this.url+'envasesTipo/'+envase.id,body,{headers: headers});
	}

	deleteEnvase(id:number){
		return this._http.delete(this.url+'envasesTipo/'+id); 
	}

	
}