import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm} from '@angular/forms';

import { RolService } from './rol.service';
import { Rol } from './rol.model';


@Component ({
	selector: 'formRolAdd',
	templateUrl: '../roles/rol-add.html',
	providers: [RolService],
	styleUrls: ['./roles.style.css']
})

export class RolAddComponent{
	public titulo: string;
	
	rol: Rol = new Rol();

	nuevo:boolean=false;
	id:number;

	constructor(private _rolService: RolService,
				private _router:Router,
				private _activatedRoute:ActivatedRoute){
		
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})


		if(this.id != null){
			this.titulo = 'Editar Rol'
		}else{
			this.titulo = 'Nuevo Rol';	
		} 

	}
	 

	ngOnInit(){
		//console.log('rol-add.component.ts cargado');

		if(this.id != null){
			this.getRol();

		}

	}


	getRol(){
		this._rolService.getRol(this.id).subscribe(
			result =>{
				if(result.status == 200){
					//console.log("Result:",result.json());
					 this.rol = result.json();
				}else{
					console.log("ID:",this.id," Result Controler:",result.status);
				}

			},
			error =>{
				console.log(<any>error);
			}
		)

	}

	guardar(rolAdd:NgForm){
		//Creo el rol desde el formulario
		this.rol=rolAdd.value;
		console.log("Rol:",this.rol);
		
		if(this.id != null){
			//Llamo al servicio que actualiza el cliente
			this.rol.id=this.id;
			this.updateRol();
		} 
		else{
			//Llamo al servicio que creara el nuevo cliente
			this.AddRol();
		}

	}


	updateRol(){
		console.log("update:",this.rol);
		this._rolService.editRol(this.id, this.rol)
				.subscribe(result => {
				////console.log("Result Controler",result.status);
 					if(result.status=200){
 						this._router.navigate(['/roles']);
 					}else{
 						//204 -- No Content
 						console.log("Result Controler",result.status);
					}
 				},
 				error => {
 					console.log(<any>error);
 				})
	}

	AddRol(){
		this._rolService.addRol(this.rol).subscribe(
			result => {
				if(result.status==201){
					this._router.navigate(['/roles/'+result.json().id]);
						console.log("Result Controler",result.status);
				}else{
						console.log("Result Controler",result.status);
				}
			},
			error => {
				console.log(<any>error);
				}
		)
	}

 		
}