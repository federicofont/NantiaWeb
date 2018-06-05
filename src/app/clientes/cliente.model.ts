import { Direccion } from './direccion.model';

export class Cliente {
	constructor(
		public id : number=null,
		public direccion : Direccion=null,
		public tipoDocumento : string=null, 
		public nroDocumento : string=null, 
		public nombre1: string=null, 
		public nombre2: string=null, 
		public saldo : number=null, 
		public fechaNacimiento : Date=null, 
		public fechaAlta : Date=null, 
		public celular : string=null, 
		public mail : string=null, 
		public envases : number=null, 
		public idLista : number=null, 
		public observaciones : string=null, 		
		public activo : boolean=null
		){}

}



