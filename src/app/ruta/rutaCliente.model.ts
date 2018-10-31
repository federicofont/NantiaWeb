import { Cliente } from '../clientes/cliente.model';

export class RutaCliente{
	constructor(
		public id: number = null,
		public cliente: Cliente = new Cliente,
		public ordenVisita: number = null
		){}
}