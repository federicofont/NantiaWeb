import { Stock } from '../stock/stock.model';

export class Fabrica{
	constructor(
		public id: number = null,
		public nombre: string = null,
		public stock: Stock = new Stock()

		){}
}