import { Injectable } from '@angular/core'; //para injectar servicios
//import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
//import { Observable} from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

//import { Usuario } from '../usuarios/usuario.model';
import { Login } from './login.model';

@Injectable()
export class LoginService {
	public url: string;

	constructor(
		public _http: HttpClient
	) {
		this.url = GLOBAL.url;
	}

	login(loginUsuario: Login) {
		let body = JSON.stringify(loginUsuario);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this._http.post(this.url + 'login', body, { headers: headers });

	}

	signup(loginUsuario, getToken = null) {
		if (getToken != null) {
			loginUsuario.getToken = getToken;
		}

		let body = JSON.stringify(loginUsuario);
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this._http.post(this.url + 'login', body, { headers: headers });
		//.map( res => res.json() );	
	}

}