import { Injectable } from '@angular/core'; //para injectar servicios
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //tipos de peticiones y cabeceras
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Cliente} from './cliente.model';
import { Direccion } from './direccion.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class ClienteService{
	public url:string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getClientes(): Observable<any>{
    	return this._http.get(this.url+'clientes');
	}

	getCliente(id:number){
		return this._http.get(this.url+'clientes/'+id); 
	}

	addCliente(cliente:Cliente){
		let body = JSON.stringify(cliente);
		let headers = new Headers({'Content-Type':'application/json'});
		
		return this._http.post(this.url+'clientes',body,{headers: headers});
		  
	}

	editCliente(id, cliente:Cliente){
		let body = JSON.stringify(cliente);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.put(this.url+'clientes/'+cliente.id,body,{headers: headers});
	}

	deleteCliente(id:number){
		return this._http.delete(this.url+'clientes/'+id); 
	}

	
}