import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { RutaService } from './ruta.service';
import { Ruta } from './ruta.model';

@Component ({
	selector: 'formRutaAdd',
	templateUrl: '../ruta/ruta-add.html',
	providers: [RutaService],
	styles: [`
		.ng-invalid.ng-touched:not(form){
		border:1px solid red;
		}`]
})

export class RutaAddComponent{
	public titulo: string;
	
	ruta = new Ruta();

	nuevo:boolean=false;
	id:number;

	constructor(private _rutaService: RutaService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this.titulo = 'Nuevo Ruta';

		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}
	 

	ngOnInit(){
		//console.log('ruta-add.component.ts cargado');
	}

	guardar(rutaAdd:NgForm){
		//console.log("ruta ADD/Update ID:", this.id);
		//if (this.id==null) {
			// Add user
		
			//Creo el ruta desde el formulario
			this.ruta=rutaAdd.value;
			//console.log("Ruta:",this.ruta);
		
			this._rutaService.addRuta(this.ruta)
				.subscribe(result => {
 					if(result.status==201){
 						this._router.navigate(['/rutas/'+result.json().id]);
 					}else{
 						//console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					//console.log(<any>error);
 				})
 		//}else{
 			// Update user
			
			//Actualizo el ruta desde el formulario
			// this.ruta=rutaAdd.value;
			// this.ruta.id=this.id;
			// //console.log("ruta:",this.ruta);
		
			// this._rutaService.updateRuta(this.ruta)
			// 	.subscribe(result => {
			// 	//console.log("Result Controler",result.status);
 		// 			if(result.status==200){
 		// 				this._router.navigate(['/rutas/'+result.json().id]);
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