import { Producto } from '../productos/producto.model';

export class ProductoStock{
	constructor(
		public id: number = null,
		public cantidad: number = null,
		public fecha: string = null,
		public producto: Producto =  new Producto()
		){}
}