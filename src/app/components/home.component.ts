import{ Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl:'../views/home.html',
})
export class HomeComponent{
	public titulo:string;

	constructor(){
		this.titulo='Pagina principal';
	}

	ngOnInit(){
		//console.log('Se ha cargado el componente home.component.ts');
	}
}