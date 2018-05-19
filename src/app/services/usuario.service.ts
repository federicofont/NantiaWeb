import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Usuario} from '../models/usuario.model';
import { GLOBAL} from './global';

@Injectable()
export class UsuarioService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getUsuarios(){
		return this._http.get(this.url+'usuarios').map(res => res.json()); 
	}

	getUsuario(id:number){
		return this._http.get(this.url+'usuarios/'+id).map(res => res.json()); 
	}

	addUsuario(usuario:Usuario){
		console.log("json:");
		//console.log(body);
		//let params = body;
		let body = JSON.stringify(usuario);
		let headers = new Headers({
			'Content-Type':'application/json'});

		return this._http.post(this.url+'usuarios',body,{headers: headers})
						 .map(res =>{
						 	console.log(res.json());
						 	return res.json();
						 });

	}

	updateUsuario(usuario:Usuario){
		let body = JSON.stringify(usuario);
		console.log("body:",body);
		let headers = new Headers({
			'Content-Type':'application/json'});

		return this._http.put(this.url+'usuarios/'+usuario.id,body,{headers: headers})
						 .map(res =>{
						 	console.log(res.json());
						 	return res.json();
						 });

	}
	
}