import { Stock } from '../stock/stock.model';

export class Vehiculo{
	constructor(
		public id: number = null,
		public matricula: string = null,
		public marca: string = null,
		public modelo: string = null,
		public descripcion: string = null,
		public activo: boolean = true,
		public coordLat: string = null,
		public coordLon: string = null
		//public stock: Stock = new Stock()

		){}
}