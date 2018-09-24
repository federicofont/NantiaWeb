import { Direccion } from './direccion.model';
import { EnvaseEnPrestamo } from './envaseEnprestamo.model';

export class Cliente{
	constructor(
		public id : number=null,
		public direccion : Direccion=null,
		public tipoDocumento : number=null, 
		public nroDocumento : string=null, 
		public nombre1: string=null, 
		public nombre2: string=null, 
		public saldo : number=null, 
		public fechaNacimiento : Date= new Date(),
		public fechaAlta : Date= new Date(), 
		public celular : string=null, 
		public mail : string=null, 
		public idLista : number=null, 
		public observaciones : string=null, 		
		public activo : boolean=null,
		//public dias: string[]=[],
		public setEnvasesEnPrestamo: EnvaseEnPrestamo[]=[]
		){}

}



