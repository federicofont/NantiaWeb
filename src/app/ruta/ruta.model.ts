import { RutaCliente } from './rutaCliente.model';

export class Ruta{
	constructor(
		public id: number = null,
		public nombre: string = null,
		public dias : string = null,
		public setRutaCliente: RutaCliente[] = []
		){}
}