import { ProductoLista } from './productolista.model';

export class ListaPrecio{
	constructor(
		public id:number=null,
		public nombreLista:string=null,
		public fechaAlta:string = null,//new Date(),
		public setProductoLista:ProductoLista[]=[]
		){}
}