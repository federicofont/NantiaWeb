import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { GLOBAL} from '../services/global';

import { Usuario } from '../usuarios/usuario.model';
import { Login} from './login.model';

@Injectable()
export class LoginService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	login(loginUsuario:Login){
		let body = JSON.stringify(loginUsuario);
		let headers = new Headers({
			'Content-Type':'application/json'});

		return this._http.post(this.url+'login',body,{headers: headers});

	}

}