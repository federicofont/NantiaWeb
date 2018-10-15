import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Venta } from './venta.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class VentaService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getVentas(): Observable<any>{
	//return this._http.get(this.url+'venta').map(res => res.json()); 
    	return this._http.get(this.url+'ventas');
	}

	getVenta(id:number): Observable<any>{
		return this._http.get(this.url+'ventas/'+id); 
	}

	addVenta(venta:Venta){
		let body = JSON.stringify(venta);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'dataventas',body,{headers: headers});
	}

	editVenta(id, venta:Venta){
		let body = JSON.stringify(venta);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'venta/'+venta.id,body,{headers: headers});
	}

	deleteVenta(id:number){
		return this._http.delete(this.url+'venta/'+id); 
	}

	
}