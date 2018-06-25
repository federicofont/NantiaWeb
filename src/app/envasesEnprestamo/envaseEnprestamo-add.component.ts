import { Component, Input, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { EnvaseEnPrestamoService } from './envaseEnprestamo.service';
import { EnvaseEnPrestamo } from './envaseEnprestamo.model';

import { Envase } from '../envases/envase.model';
import { EnvaseService } from '../envases/envase.service';

@Component ({
	selector: 'formEnvaseEnPrestamoAdd',
	templateUrl: './envaseEnprestamo-add.html',
	providers: [EnvaseEnPrestamoService, EnvaseService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class EnvaseEnPrestamoAddComponent{
	public titulo: string;
	nuevo:boolean=false;
	id:number;

	@Input() envase : Envase = new Envase();
	envases : Envase [] = [];
	envaseEnprestamo: EnvaseEnPrestamo = new EnvaseEnPrestamo();
	
	constructor(private _envaseEnprestamoService: EnvaseEnPrestamoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute,
				private _envaseService: EnvaseService){
		
		this.titulo = 'Nuevo Envase en Prestamo';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('envaseEnprestamo-add.component.ts cargado');
		this.getEnvases();

	}

	guardar(envaseEnprestamoAdd:NgForm){
		
			//Creo el envaseEnprestamo desde el formulario
			this.envaseEnprestamo.cantidad=envaseEnprestamoAdd.controls['cantidad'].value;
			this.envase = this.envases[ envaseEnprestamoAdd.controls['id'].value ];
			
			console.log("envase",this.envase);
			this.envaseEnprestamo.envasetipos = this.envase;
			console.log("envaseEnprestamo",this.envaseEnprestamo);
		
			this._envaseEnprestamoService.addEnvaseEnPrestamo(this.envaseEnprestamo)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/cliente-add/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})

	}

	getEnvases(){
		this._envaseService.getEnvases().subscribe(
			result =>{
				if(result.status == 200){
					 this.envases = result.json();
					 //console.log(result.json());
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