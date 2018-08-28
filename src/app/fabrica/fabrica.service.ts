import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Fabrica } from './fabrica.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class FabricaService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getFabricas(): Observable<any>{
	//return this._http.get(this.url+'fabricasTipo').map(res => res.json()); 
    	return this._http.get(this.url+'fabrica');
	}

	getFabrica(id:number): Observable<any>{
		return this._http.get(this.url+'fabrica/'+id); 
	}

	addFabrica(fabrica:Fabrica){
		let body = JSON.stringify(fabrica);
		let headers = new Headers({'Content-Type':'application/json'});
		console.log("Fabrica(body):", body);

		return this._http.post(this.url+'fabrica',body,{headers: headers});
	}

	editFabrica(id, fabrica:Fabrica){
		let body = JSON.stringify(fabrica);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'fabrica/'+fabrica.id,body,{headers: headers});
	}

	deleteFabrica(id:number){
		return this._http.delete(this.url+'fabrica/'+id); 
	}

	
}