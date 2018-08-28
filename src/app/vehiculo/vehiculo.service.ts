import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Vehiculo } from './vehiculo.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class VehiculoService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getVehiculos(): Observable<any>{
	//return this._http.get(this.url+'vehiculosTipo').map(res => res.json()); 
    	return this._http.get(this.url+'vehiculo');
	}

	getVehiculo(id:number): Observable<any>{
		return this._http.get(this.url+'vehiculo/'+id); 
	}

	addVehiculo(vehiculo:Vehiculo){
		let body = JSON.stringify(vehiculo);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'vehiculo',body,{headers: headers});
	}

	editVehiculo(id, vehiculo:Vehiculo){
		let body = JSON.stringify(vehiculo);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'vehiculo/'+vehiculo.id,body,{headers: headers});
	}

	deleteVehiculo(id:number){
		return this._http.delete(this.url+'vehiculo/'+id); 
	}

	
}