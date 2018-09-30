import { Usuario } from '../usuarios/usuario.model';
import { Cliente } from '../clientes/cliente.model';
import { ProductoVenta } from './productoVenta.model';

export class Venta{
	constructor(
		public id:number = null,
		public fecha:string = null,
		public usuario:Usuario = new Usuario(),
		public cliente:Cliente = new Cliente(),
		public setProductoVenta:ProductoVenta[] = [],
		public descuento:number = 0,
		public totalVenta:number = 0,
		public ivaTotal:number = 0,
		public pagoTotal:number = 0,
		public fabricaid:number = null,
		public repartoid:number = null
		//observaciones
		){}
}


