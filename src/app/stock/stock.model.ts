import { EnvaseStock } from './envasestock.model';
import { ProductoStock } from './productostock.model';


export class Stock{
	constructor(
		public id: number = null,
		public fecha: string = null,
		public setEnvaseStock: EnvaseStock[] = [],
		public setProductoStock: ProductoStock[] = []

		){}
}