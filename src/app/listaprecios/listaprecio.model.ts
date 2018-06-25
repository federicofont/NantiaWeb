import { ProductoLista } from '../productolistas/productolista.model';

export class ListaPrecio{
	constructor(
		public id:number=null,
		public nombrelista:string=null,
		public fechaAlta:Date=null,
		public productoslista:ProductoLista[]=[]
		){}
}