import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { RepartoService } from './reparto.service';
import { Reparto } from './reparto.model';

@Component ({
	selector: 'formRepartoAdd',
	templateUrl: '../reparto/reparto-add.html',
	providers: [RepartoService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class RepartoAddComponent{
	public titulo: string;
	
	reparto = new Reparto();

	nuevo:boolean=false;
	id:number;

	constructor(private _repartoService: RepartoService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo Reparto';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('reparto-add.component.ts cargado');
	}

	guardar(repartoAdd:NgForm){
		//console.log("reparto ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el reparto desde el formulario
			this.reparto=repartoAdd.value;
			//console.log("Reparto:",this.reparto);
		
			this._repartoService.addReparto(this.reparto)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/repartos/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el reparto desde el formulario
			// this.reparto=repartoAdd.value;
			// this.reparto.id=this.id;
			// //console.log("reparto:",this.reparto);
		
			// this._repartoService.updateReparto(this.reparto)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/repartos/'+result.json().id]);
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