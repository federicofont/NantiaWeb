import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolService } from './rol.service';
import { Rol} from './rol.model';

@Component({
	selector: 'roles-list',
	templateUrl: './roles-list.html',
	providers: [RolService]
})
export class RolesListComponent{
	public titulo: string;
	public rol:Rol;
	public roles: Rol[];
	public confirmado;
	public id:number;

	
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _rolService: RolService
	){
		this.titulo = 'Listado de roles';
		this._activatedRoute.params
			.subscribe( parametros=>{
			//console.log("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		//console.log('Rols-list.compoent.ts cargado');
		//alert(this._rolService.getRols());
		if (this.id==null) {
			//console.log("pase el if");
			this.getRols();
		}else{
			//console.log("Entre al else")
			this.getRol();
			
		}

	}

		getRols(){
			this._rolService.getRoles().subscribe(
				result =>{
					if(result.status == 200){
						 this.roles = result.json();
						 console.log("result.status:", result.status);
					}else{
						console.log("Result Controler",result.status); 
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		getRol(){
			this._rolService.getRol(this.id).subscribe(
				result =>{
					if(result.status == 200){
						 this.rol = result.json();
					}else{
						console.log("ID:",this.id," Result Controler:",result.status);
					}

				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDeleteRol(id){
			this._rolService.deleteRol(id).subscribe(
				result =>{
					if(result.status == 200){
						this.getRols();
					}else{
						alert("Error al borrar rol")
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

}