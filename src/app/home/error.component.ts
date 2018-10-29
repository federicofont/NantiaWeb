import { Component } from '@angular/core';

@Component ({
	selector: 'error',
	templateUrl: './error.html'
})

export class ErrorComponent{
	public titulo:string;

	constructor(){
		this.titulo="Error! : Pagina no encontrada."
	}

	ngOnInit(){
		//console.log("Componente errocomponent.ts cargado");
	}
}