import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { StockService } from './stock.service';
import { Stock } from './stock.model';

//import { ProductoStock } from './productostock.model';
//import { EnvaseStock } from './envasestock.model';


@Component ({
	selector: 'stock-detail',
	templateUrl: './stock-detail.html',
	providers: [StockService]
})

export class StockDetailComponent{
	public titulo: string;
	stock: Stock = new Stock();
	public id:number;

//	envaseStock : EnvaseStock = new EnvaseStock();
//	setEnvaseStock : EnvaseStock[] = [];

//	productoStock : ProductoStock = new ProductoStock();
//	setProductoStock : ProductoStock[] = [];

	constructor(private _stockService: StockService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Stock';

		this._activatedRoute.params
			.subscribe( parametros=>{
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){

		this.getStock(this.id);

	}


	getStock(id:number){
		this._stockService.getStock(id).subscribe(
				result =>{
					if(result.status == 200){
						 this.stock = result.json();
						// this.setProductoStock=this.stock.setProductoStock;
						// this.setEnvaseStock=this.stock.setEnvaseStock;
						 console.log(this.stock);
					}else{
						console.log("ID:",id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			)
	}

}
