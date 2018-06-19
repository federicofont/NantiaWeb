import { Component } from '@angular/core';

@Component ({
	selector: 'error',
	templateUrl: './login-error.html'
})

export class LoginErrorComponent{
	public titulo:string;

	constructor(){
		this.titulo="Error! : Usuario no valido."
	}

	ngOnInit(){
		console.log("Componente login-error.ts cargado");
	}
}