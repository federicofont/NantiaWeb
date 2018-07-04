import { Producto } from '../productos/producto.model';

export class ProductoLista{
	constructor(
		public id: number = null,
		public precio: number = null,
		public actualizado: Date = null,
		public productos: Producto = null,//es 1 pero quedo mal en Java
		){}
}