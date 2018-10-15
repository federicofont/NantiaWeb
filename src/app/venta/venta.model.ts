import { Usuario } from '../usuarios/usuario.model';
import { Cliente } from '../clientes/cliente.model';
import { Pago } from './pago.model';
import { ProductoVenta } from './productoVenta.model';

export class Venta{
	constructor(
		public id:number = null,
		public fecha:string = null,
		public usuario:Usuario = new Usuario(),
		public cliente:Cliente = new Cliente(),
		public setProductoVenta:ProductoVenta[] = [],
		public descuento:number = 0,
		public totalventa:number = 0,
		public ivatotal:number = 0,
		public pagototal:number = 0,
		public fabricaid:number = null,
		public repartoid:number = null,
		public datapago:Pago = new Pago()
		//observaciones
		){}
}


