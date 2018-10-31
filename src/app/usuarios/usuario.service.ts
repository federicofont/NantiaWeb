import { Injectable } from '@angular/core'; //para injectar servicios
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Usuario} from './usuario.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class UsuarioService{
	public url:string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

	getUsuarios(): Observable<any>{
		//return this._http.get(this.url+'usuarios').map(res => res.json()); 
	    return this._http.get(this.url+'usuarios');
	}

	getUsuario(id:number){
		return this._http.get(this.url+'usuarios/'+id)
	}

	addUsuario(usuario:Usuario){
		let body = JSON.stringify(usuario);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.post(this.url+'usuarios',body,{headers: headers});
						 //.map(res =>{
						 //	////console.logres.json());
						 //	return res.json();
						 //});

	}

	editUsuario(id, usuario:Usuario){
		let body = JSON.stringify(usuario);
		////console.log(("body:",body);
		let headers = new HttpHeaders({
			'Content-Type':'application/json'});

		return this._http.put(this.url+'usuarios/'+usuario.id,body,{headers: headers});
						// .map(res =>{
						// 	////console.logres.json());
						// 	return res.json();
						// });

	}

	deleteUsuario(id:number){
		return this._http.delete(this.url+'usuarios/'+id); 
	}
	
}