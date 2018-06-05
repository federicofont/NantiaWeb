import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable ()
export class RequestService{
	 public url1:string;
	 public url2:string;
	
	constructor(private _http:Http){
		//this.url1="https://jsonplaceholder.typicode.com/posts"
		//this.url2="http://localhost:8080/RestSoda/Soderia/coordenadasNantia/nombreCliente/Fede"
		//this.url="http://localhost:8080/RestSoda"
	}

	getPrueba(){
		return 'Hola mundo desde el service.';
	}

	//getListado(){
	//	return this._http.get(this.url1)
	//					 .map(res=>res.json());
	//}

	getPuntoInicial(){
		return this._http.get(this.url2)
						 .map(res=>res.json());
	}




}






