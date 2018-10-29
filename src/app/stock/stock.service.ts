import { Injectable } from '@angular/core'; //para injectar servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'; //mapear respuestas y conseguir objetos de la respuesta
import { Observable} from 'rxjs/Observable';
import { Stock } from './stock.model';
import { GLOBAL} from '../services/global';

@Injectable()
export class StockService{
	public url:string;

	constructor(
		public _http: HttpClient
	){
		this.url = GLOBAL.url;
	}

	getStocks(): Observable<any>{
	    return this._http.get(this.url+'stock');
	}

	getStock(id:number){
		return this._http.get(this.url+'stock/'+id); 
	}

	addStock(stock:Stock){
		let body = JSON.stringify(stock);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		////console.log(("body",body);

		return this._http.post(this.url+'stock',body,{headers: headers});
	}

	editStock(id, stock:Stock){
		let body = JSON.stringify(stock);
		let headers = new HttpHeaders({'Content-Type':'application/json'});

		return this._http.put(this.url+'stock/'+stock.id,body,{headers: headers});
	}

	deleteStock(id:number){
		return this._http.delete(this.url+'stock/'+id); 
	}

	
}