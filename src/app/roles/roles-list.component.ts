import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolService } from './rol.service';
import { Rol} from './rol.model';

@Component({
	selector: 'roles-list',
	templateUrl: './roles-list.html',
	providers: [RolService],
	styleUrls: ['./roles.style.css']
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
			////console.log(("id",parametros.id);
			this.id = parametros['id'];
			})
	}

	ngOnInit(){
		////console.log(('Rols-list.compoent.ts cargado');
		//alert(this._rolService.getRols());
		if (this.id==null) {
			////console.log(("pase el if");
			this.getRols();
		}else{
			////console.log(("Entre al else")
			this.getRol();
			
		}

	}



		getRols(){
			this._rolService.getRoles().subscribe(
				(result : any) =>{
					//console.log(result.headers.keys());
					//console.log(result.body);
					if (result.body.length > 0) {
						 this.roles = result.body;
						 //console.log("result.status:", result.status);
					}else{
						//console.log("Result Controler",result.status); 
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
		}

		getRol(){
			this._rolService.getRol(this.id).subscribe(
				(result : any) =>{
					if (result.lengh>0) {
						 this.rol = result;
					}else{
						//console.log("ID:",this.id," Result Controler:",result);
					}

				},
				error =>{
					//console.log(<any>error);
				}
			);
		}

		borrarConfirm(id){
			this.confirmado=id;
		}

		cancelarConfirm(){
			this.confirmado=null;
		}

		onDelete(id){
			this._rolService.deleteRol(id).subscribe(
				result =>{
					//console.log(result);
					if (result == null) {
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