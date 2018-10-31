import { Usuario } from '../usuarios/usuario.model';
import { Vehiculo } from '../vehiculo/vehiculo.model';
import { Ruta } from '../ruta/ruta.model';
import { Fabrica } from '../fabrica/fabrica.model';
import { Stock } from '../stock/stock.model';

export class Reparto{
	constructor(
		public id: number = null,
		public descripcion: string = null,
		public vendedor1: Usuario = new Usuario(),
		public vendedor2: Usuario = new Usuario(),
		public vehiculo: Vehiculo = new Vehiculo(),
		public fecha: string = null,
		public ruta: Ruta = new Ruta(),
		public estado: string = null,
		public fabricaid: number = null,
		//public fabrica: Fabrica = new Fabrica(),
		public stock: Stock = new Stock()

		){}
}