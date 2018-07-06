import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Rol} from './rol.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class RolService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getRoles(): Observable<any>{
	//return this._http.get(this.url+'roles').map(res => res.json()); 
    return this._http.get(this.url+'roles');
	}

	getRol(id:number){
		return this._http.get(this.url+'roles/'+id); 
	}

	addRol(rol:Rol){
		let body = JSON.stringify(rol);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'roles',body,{headers: headers});
	}

	editRol(id, rol:Rol){
		let body = JSON.stringify(rol);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'roles/'+rol.id,body,{headers: headers});
	}

	deleteRol(id:number){
		return this._http.delete(this.url+'roles/'+id); 
	}

	
}