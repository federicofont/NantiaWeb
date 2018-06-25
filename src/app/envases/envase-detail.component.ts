import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { EnvaseService } from './envase.service';
import { Envase } from './envase.model';

@Component ({
	selector: 'envase-detail',
	templateUrl: '../envases/envase-detail.html',
	providers: [EnvaseService]
})

export class EnvaseDetailComponent{
	public titulo: string;
	public envase:Envase;
	public id:number;

	constructor(private _envaseService: EnvaseService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute)
		{
		this.titulo = 'Envase';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
		}
	
	ngOnInit(){
		//console.log('envase-detail.component.ts cargado');

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


	}
