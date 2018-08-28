import { Cliente } from '../clientes/cliente.model';

export class RutaCliente{
	constructor(
		public id: number = null,
		public cliente: Cliente = null,
		public ordenVisita: number = null
		){}
}