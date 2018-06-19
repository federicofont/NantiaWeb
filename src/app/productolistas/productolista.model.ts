import { Producto } from '../productos/producto.model';

export class ProductoLista{
	constructor(
		public id: number = null,
		public producto: Producto = null,
		public precio: number = null,
		public actualizado: Date = null
		){}
}