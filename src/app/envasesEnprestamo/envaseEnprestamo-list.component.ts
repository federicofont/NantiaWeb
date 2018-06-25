import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvaseEnPrestamoService } from './envaseEnprestamo.service';
import { EnvaseEnPrestamo} from './envaseEnprestamo.model';

@Component({
	selector: 'envaseEnprestamo-list',
	templateUrl: './envaseEnprestamo-list.html',
	providers: [EnvaseEnPrestamoService]
})
export class EnvaseEnPrestamoListComponent{
	public titulo: string;
	public envaseEnprestamo:EnvaseEnPrestamo;
	public envasesEnprestamo: EnvaseEnPrestamo[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _envaseEnprestamoService: EnvaseEnPrestamoService
	){
		this.titulo = 'Listado de Envases En Prestamo';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){

			this.getEnvasesEnPrestamo();

	}
		
	getEnvasesEnPrestamo(){
		this._envaseEnprestamoService.getEnvasesEnPrestamo().subscribe(
			result =>{
				if(result.status == 200){
					 this.envasesEnprestamo = result.json();
					 //console.log("result.json()", result.json());
					 //console.log("this.envasesEnprestamo",this.envasesEnprestamo);
				}else{
					//console.log("Result Controler",result.status); 
				}
			},
			error =>{
				//console.log(<any>error);
			}
		);
	}


}