import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { EnvaseEnPrestamo} from './envaseEnprestamo.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class EnvaseEnPrestamoService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getEnvasesEnPrestamo(): Observable<any>{
	//return this._http.get(this.url+'envaseEnprestamos').map(res => res.json()); 
    return this._http.get(this.url+'envasesEnPrestamo');
	}

//	getEnvaseEnPrestamo(id:number){
//		return this._http.get(this.url+'envasesEnPrestamo/'+id); 
//	}

	addEnvaseEnPrestamo(envaseEnprestamo:EnvaseEnPrestamo){
		let body = JSON.stringify(envaseEnprestamo);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'envasesEnPrestamo',body,{headers: headers});
	}

	//updateEnvaseEnPrestamo(envaseEnprestamo:EnvaseEnPrestamo){
	//	let body = JSON.stringify(envaseEnprestamo);
	//	let headers = new Headers({'Content-Type':'application/json'});

	//	return this._http.put(this.url+'envasesEnPrestamo/'+envaseEnprestamo.id,body,{headers: headers});
	//}

	editEnvaseEnPrestamo(id, envaseEnprestamo:EnvaseEnPrestamo){
		let body = JSON.stringify(envaseEnprestamo);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'envasesEnPrestamo/'+envaseEnprestamo.id,body,{headers: headers});
	}

	deleteEnvaseEnPrestamo(id:number){
		return this._http.delete(this.url+'envasesEnPrestamo/'+id); 
	}

	
}