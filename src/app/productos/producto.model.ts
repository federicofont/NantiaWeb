import { Envase } from '../envases/envase.model';

export class Producto{
	constructor(
		public productoId: number = null,
		public nombre: string = null,
		public presentacion: string = null,
		public descripcion: string = null,
		public retornable: boolean = null,
		public envasesTipos: Envase = new Envase()

		){}
}