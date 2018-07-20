import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvaseService } from './envase.service';
import { Envase} from './envase.model';

@Component({
	selector: 'envases-list',
	templateUrl: '../envases/envases-list.html',
	providers: [EnvaseService]
})
export class EnvasesListComponent{
	public titulo: string;
	public envase:Envase;
	public envases: Envase[];

	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _envaseService: EnvaseService
	){
		this.titulo = 'Listado de envases';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		//console.log('Envases-list.compoent.ts cargado');
		//alert(this._envaseService.getEnvases());
		if (this.id==null) {
			//console.log("pase el if");
			this.getEnvases();
		}else{
			//console.log("Entre al else")
			this.getEnvase(this.id);
		}
}
		getEnvases(){
			this._envaseService.getEnvases().subscribe(
				result =>{
					if(result.status == 200){
						 this.envases = result.json();
						 console.log(result.json());
					}else{
						//console.log("Result Controler",result.status); 
					}
				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		getEnvase(id){
			this._envaseService.getEnvase(id).subscribe(
				result =>{
					if(result.status == 200){
						 this.envase = result.json();
						 console.log("GetEnvase",result.json());
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			);
		}


		public confirmado;

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDeleteEnvase(id){
			this._envaseService.deleteEnvase(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getEnvases();
					}else{
						alert("Error al borrar envase")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}