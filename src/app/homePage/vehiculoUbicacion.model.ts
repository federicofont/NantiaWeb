import { Vehiculo } from '../vehiculo/vehiculo.model';

export class VehiculoUbicacion{
	constructor(
		public id: number = null,
		public vehiculo: Vehiculo = null,
		public coordLon: string = null,
		public coordLat: string = null,
		public fecha: string = null

		){}
}
