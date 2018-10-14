import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Ruta } from './ruta.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class RutaService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getRutas(): Observable<any>{
	//return this._http.get(this.url+'rutasTipo').map(res => res.json()); 
    	return this._http.get(this.url+'ruta');
	}

	getRuta(id:number): Observable<any>{
		return this._http.get(this.url+'ruta/'+id); 
	}

	addRuta(ruta:Ruta){
		let body = JSON.stringify(ruta);
		let headers = new Headers({'Content-Type':'application/json'});
		//console.log('json_ruta',body);
		return this._http.post(this.url+'ruta',body,{headers: headers});
	}

	editRuta(id, ruta:Ruta){
		let body = JSON.stringify(ruta);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'ruta/'+ruta.id,body,{headers: headers});
	}

	deleteRuta(id:number){
		return this._http.delete(this.url+'ruta/'+id); 
	}

	
}