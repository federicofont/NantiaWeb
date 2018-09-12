import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { EnvaseService } from './envase.service';
import { Envase } from './envase.model';

@Component ({
	selector: 'formEnvase-edit',
	templateUrl: '../envases/envase-add.html',
	providers: [EnvaseService],
	styleUrls: ['./envase.style.css']
})

export class EnvaseEditComponent{
	public titulo: string;
	public is_edit;

envase: Envase = {
	id: null,
	descripcion: null
}
	id:number;

	constructor(private _envaseService: EnvaseService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Editar Envase';
		this.is_edit = true;

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('envase-add.component.ts cargado');
		this.getEnvase();
	}

	getEnvase(){
	this._envaseService.getEnvase(this.id).subscribe(
				result =>{
					if(result.status == 200){
						//console.log("Result:",result.json());
						 this.envase = result.json();
					}else{
						//console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			)
	};

	guardar(envaseAdd:NgForm){
		this.envase.id= this.id;
		this.updateEnvase();
	}

	updateEnvase(){
		this._envaseService.editEnvase(this.id, this.envase)
				.subscribe(result => {
				//console.log("Result Controler",result.status);
 					if(result.status==200){
 						this._router.navigate(['/envases/'+result.json().id]);
 					}else{
 						//204 -- No Content
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
	};

	
}