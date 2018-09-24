import { Rol } from '../roles/rol.model';

export class Usuario{
	constructor(
		public id:number = null,
		public usuario:string = null,
		public nombre:string = null,
		public apellido:string = null,
		public rol:Rol = new Rol(),
		public contrasenia:string = null,
		public esVendedor:boolean = true,
		public saldoCaja:number=null
		){}
}
