import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Stock } from './stock.model';
import { StockService } from './stock.service';


@Component({
	selector: 'stocks-list',
	templateUrl: '../stock/stock-list.html',
	providers: [StockService],
	styleUrls: ['./stock.style.css']
})
export class StockListComponent{
	public titulo: string;
	public stock: Stock;
	public stocks: Stock[];
	public confirmado;
	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _stockService: StockService
	){
		this.titulo = 'Stock';
		this._activatedRoute.params
			.subscribe( parametros=>{
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		if (this.id == null) {
			this.getStocks();
		}else{
			this.getStock(this.id)
			
		}
	}

		getStocks(){
			this._stockService.getStocks().subscribe(
				result =>{
					if(result.status == 200){
						 this.stocks = result.json();
						 console.log("STOCK",this.stock);
					}else{
						console.log("Result Controler",result.status); 
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		getStock(id:number){
			this._stockService.getStock(id).subscribe(
				result =>{
					if(result.status == 200){
						 this.stock = result.json();
					}else{
						console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}


		borrarConfirm(id){
			this.confirmado = id;
		}

		cancelarConfirm(){
			this.confirmado = null;
		}

		onDeleteStock(id){
			this._stockService.deleteStock(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getStocks();
					}else{
						alert("Error al borrar stock")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}