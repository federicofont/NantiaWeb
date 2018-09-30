import { Usuario } from '../usuarios/usuario.model';
import { Vehiculo } from '../vehiculo/vehiculo.model';
import { Ruta } from '../ruta/ruta.model';

export class Reparto{
	constructor(
		public id: number = null,
		public descripcion: string = null,
		public vendedor1: Usuario = new Usuario(),
		public vendedor2: Usuario = new Usuario(),
		public vehiculo: Vehiculo = new Vehiculo(),
		public fecha: string = null,
		public ruta: Ruta = new Ruta()
		){}
}