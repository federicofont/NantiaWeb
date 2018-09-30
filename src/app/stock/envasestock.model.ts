import { Envase } from '../envases/envase.model';

export class EnvaseStock{
	constructor(
		public id: number = null,
		public cantidad: number = null,
		public fecha: string = null,
		public envasesTipos: Envase = new Envase()

		){}
}