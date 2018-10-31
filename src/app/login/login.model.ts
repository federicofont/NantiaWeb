export class Login {
	constructor(
		public nombreUsuario: string = null,
		public contrasenia: string = null
	) { }
}

export class LoginError {
	constructor(
		public	code: number = null,
		public	message: string =null
	) { }
}
