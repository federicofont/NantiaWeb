import { Producto } from '../models/producto.model';

export class ListaPrecio{
	constructor(
		public id:number,
		public nombreLista:string,
		public fechaAlta:Date,
		public productosLista:Producto[]
		){}
}