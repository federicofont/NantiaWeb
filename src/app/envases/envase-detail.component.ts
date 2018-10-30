import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';
import { EnvaseService } from './envase.service';
import { Envase } from './envase.model';

@Component ({
	selector: 'envase-detail',
	templateUrl: '../envases/envase-detail.html',
	providers: [EnvaseService],
	styleUrls: ['./envase.style.css']
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
			this.id = parametros['id'];
			})
		}
	
		ngOnInit(){
			
		this.getEnvase(this.id);
	}

	getEnvase(id:number){
		this._envaseService.getEnvase(id)
			.subscribe((result : Envase) => {
				if(result.id > 0){	 
					this.envase=result; 
			 	}
			},
		error => {
					////console.log((<any>error);
				})
	}

};