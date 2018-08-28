import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { EnvaseService } from './envase.service';
import { Envase } from './envase.model';

@Component ({
	selector: 'formEnvaseAdd',
	templateUrl: '../envases/envase-add.html',
	providers: [EnvaseService],
	styleUrls: ['./envase.style.css']
})

export class EnvaseAddComponent{
	public titulo: string;
	
envase: Envase = {
	id: null,
	descripcion: null
}

	nuevo:boolean=false;
	id:number;

	constructor(private _envaseService: EnvaseService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo Envase';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('envase-add.component.ts cargado');
	}

	guardar(envaseAdd:NgForm){
		//console.log("envase ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el envase desde el formulario
			this.envase=envaseAdd.value;
			//console.log("Envase:",this.envase);
		
			this._envaseService.addEnvase(this.envase)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/envases/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el envase desde el formulario
			// this.envase=envaseAdd.value;
			// this.envase.id=this.id;
			// //console.log("envase:",this.envase);
		
			// this._envaseService.updateEnvase(this.envase)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/envases/'+result.json().id]);
 		// 			}else{
 		// 				//204 -- No Content
 		// 				//console.log("Result Controler",result.status);
			// 		}
 		// 		},
 		// 		error => {
 		// 			//console.log(<any>error);
 		// 		})
 		// }

	}
}