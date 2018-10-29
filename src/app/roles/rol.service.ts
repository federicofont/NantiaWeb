import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable } from 'rxjs/Observable';
import { Rol } from './rol.model';
import { GLOBAL } from '../services/global';
import { Config } from 'protractor';

@Injectable()
export class RolService {
	public url: string;

	constructor(
		public _http: HttpClient
	) {
		this.url = GLOBAL.url;
	}

	getRoles(): Observable<HttpResponse<Config>> {
		//return this._http.get(this.url+'roles').map(res => res.json()); 
		return this._http.get<Config>(
			this.url + 'roles',{observe:'response'});
	}

	//getConfigResponse(): Observable<HttpResponse<Config>> {
	//	return this.http.get<Config>(
	//		this.configUrl, { observe: 'response' });
	//}

	getRol(id: number) {
		return this._http.get(this.url + 'roles/' + id);
	}

	addRol(rol: Rol) {
		let body = JSON.stringify(rol);
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this._http.post(this.url + 'roles', body, { headers: headers });
	}

	editRol(id, rol: Rol) {
		let body = JSON.stringify(rol);
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this._http.put(this.url + 'roles/' + rol.id, body, { headers: headers });
	}

	deleteRol(id: number) {
		return this._http.delete(this.url + 'roles/' + id);
	}


}