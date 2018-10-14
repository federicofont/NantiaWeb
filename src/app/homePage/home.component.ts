import{ Component } from '@angular/core';
import { GLOBAL} from '../services/global';

@Component({
	selector: 'home',
	templateUrl:'./home.html',
})
export class HomeComponent{
	public titulo:string;

	constructor(){
		this.titulo='Pagina principal';
	}

	ngOnInit(){
		console.log(GLOBAL.login);
		//console.log('Se ha cargado el componente home.component.ts');
	}
}