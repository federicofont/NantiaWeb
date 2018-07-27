import { EnvaseStock } from './envasestock.model';
import { ProductoStock } from './productostock.model';


export class Stock{
	constructor(
		public id: number = null,
		public fecha: Date = null,
		public setEnvaseStock: EnvaseStock[] = [],
		public setProductoStock: ProductoStock[] = []

		){}
}