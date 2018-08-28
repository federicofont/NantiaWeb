import { Usuario } from '../usuarios/usuario.model';
import { Vehiculo } from '../vehiculo/vehiculo.model';
import { Ruta } from '../ruta/ruta.model';

export class Reparto{
	constructor(
		public id: number = null,
		public descripcion: string = null,
		public vendedor1: Usuario = null,
		public vendedor2: Usuario = null,
		public vehiculo: Vehiculo = null,
		public fecha: Date = null,
		public ruta: Ruta = null
		){}
}