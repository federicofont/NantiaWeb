import { Envase } from '../envases/envase.model';

export class EnvaseEnPrestamo{
	constructor(
		public id : number = null,
		public envasetipos : Envase = null,
		public cantidad : number = null,

		){}

}
