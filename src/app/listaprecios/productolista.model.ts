import { Producto } from '../productos/producto.model';
import { Fecha } from '../fecha';

export class ProductoLista{
	constructor(
		public id: number = null,
		public precio: number = null,
		public actualizado: string = null,
		public productos: Producto = null,//es 1 pero quedo mal en Java
		){}
}