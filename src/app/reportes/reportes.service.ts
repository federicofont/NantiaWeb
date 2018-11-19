import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { GLOBAL} from '../services/global';

@Injectable()
export class ReporteService{
	public url:string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

//ventas por periodo y o cliente
//http://localhost:8080/api/dataventas/ventasporperiodo/2018-10-01/2018-10-15/0
	getVentasPeriodo(): Observable<any>{
    	return this._http.get(this.url+'dataventas/ventasporperiodo/'+''+'/'+''+'/'+0);
	}

	getVentaPeriodo(desde:string, hasta:string): Observable<any>{
    	return this._http.get(this.url+'dataventas/ventasporperiodo/'+desde+'/'+hasta);
	}

//Cuentas a Cobrar Por clientes y antigüedad
//http://localhost:8080/api/dataclientes/cuentasacobrar/25
	getCuentasACobrar(): Observable<any>{
		return this._http.get(this.url+'dataclientes/cuentasacobrar/'+0); 
	}

	getCuentaACobrar(id:number): Observable<any>{
		return this._http.get(this.url+'dataclientes/cuentasacobrar/'+id); 
	}


//Stock de Envases a préstamo
//http://localhost:8080/api/dataclientes/envasesenprestamo/0
	getEnvasesEnPrestamo(): Observable<any>{
		return this._http.get(this.url+'dataclientes/envasesenprestamo/'+0); 
	}

	getEnvaseEnPrestamo(id:number): Observable<any>{
		return this._http.get(this.url+'dataclientes/envasesenprestamo/'+id); 
	}



	
}